"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Calendar as CalendarIcon } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export type Field = {
  id: string;
  label: string;
  value: string;
  type?: "text" | "date" | "signature";
  status: "review" | "confirmed";
};

interface ReviewFormProps {
  filledFields: Field[];
  missingFields: {
    id: string;
    label: string;
    value: string;
  }[];
  onFieldUpdate: (id: string, value: string) => void;
  onConfirmAutoFill: () => void;
  onApplyMissing: () => void;
  onRefreshDocument: () => void;
}

export function ReviewForm({
  filledFields,
  missingFields,
  onFieldUpdate,
  onConfirmAutoFill,
  onApplyMissing,
  onRefreshDocument,
}: ReviewFormProps) {
  const [activeTab, setActiveTab] = useState<"filled" | "missing">("filled");

  const handleCheckboxChange = (fieldId: string, checked: boolean) => {
    onFieldUpdate(
      fieldId,
      filledFields.find((f) => f.id === fieldId)?.value || ""
    );
  };

  const renderField = (field: Field) => {
    if (field.type === "signature") {
      return (
        <div className="relative h-[100px] w-full border rounded-lg overflow-hidden">
          {field.value ? (
            <Image
              src={field.value}
              alt="Signature"
              fill
              className="object-contain"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              No signature provided
            </div>
          )}
        </div>
      );
    }

    if (field.type === "date") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                format(new Date(field.value), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) =>
                onFieldUpdate(field.id, date ? date.toISOString() : "")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <Input
        id={field.id}
        value={field.value}
        onChange={(e) => onFieldUpdate(field.id, e.target.value)}
      />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">
          Information detected from the document
        </h1>
        <p className="text-gray-600 mt-2">
          Complete your document by adding these information
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "filled" | "missing")}
        className="flex-1"
      >
        <TabsList className="px-6 pt-2">
          <TabsTrigger value="filled" className="relative">
            Available Data ({filledFields.length})
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform origin-left transition-transform" />
          </TabsTrigger>
          <TabsTrigger value="missing" className="relative">
            Missing Information ({missingFields.length})
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform origin-left transition-transform" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="filled" className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                The following data were gathered from your profile
              </h3>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="space-y-4">
              {filledFields.map((field) => (
                <div key={field.id} className="flex items-start gap-4">
                  <Checkbox
                    id={`confirm-${field.id}`}
                    checked={field.status === "confirmed"}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(field.id, checked as boolean)
                    }
                  />
                  <div className="flex-1 space-y-1.5">
                    <Label
                      htmlFor={`confirm-${field.id}`}
                      className="cursor-pointer"
                      onClick={() =>
                        handleCheckboxChange(
                          field.id,
                          field.status !== "confirmed"
                        )
                      }
                    >
                      {field.label}
                    </Label>
                    {renderField(field)}
                  </div>
                </div>
              ))}
            </div>

            <Button
              className="w-full"
              onClick={() => {
                onConfirmAutoFill();
                onRefreshDocument();
              }}
            >
              Confirm Auto-fill
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="missing" className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                The following information was missing from your profile
              </h3>
              <Button variant="ghost" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>

            <div className="space-y-6 border rounded-lg p-4 bg-gray-50">
              <div className="space-y-4">
                <h4 className="font-semibold">Part 1 – New York State</h4>
                <div className="flex items-start gap-4">
                  <Checkbox id="ny-residence" />
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="ny-residence" className="cursor-pointer">
                      I certify that I am not a resident of New York State and
                      that my residence is as stated above.
                    </Label>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Checkbox id="ny-estimate" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ny-estimate">I estimate that</Label>
                      <Input className="w-20" placeholder="0" />
                      <Label>
                        % of my services during the year will be performed
                        within New York State and subject to New York State
                        withholding tax.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Part 2 – New York City</h4>
                <div className="flex items-start gap-4">
                  <Checkbox id="nyc-residence" />
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor="nyc-residence" className="cursor-pointer">
                      I certify that I am not a resident of New York City and
                      that my residence is as stated above.
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">Part 3 – Yonkers</h4>
                <div className="flex items-start gap-4">
                  <Checkbox id="yonkers-residence" />
                  <div className="flex-1 space-y-1.5">
                    <Label
                      htmlFor="yonkers-residence"
                      className="cursor-pointer"
                    >
                      I certify that I am not a resident of Yonkers and that my
                      residence is as stated above.
                    </Label>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Checkbox id="yonkers-estimate" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="yonkers-estimate">I estimate that</Label>
                      <Input className="w-20" placeholder="0" />
                      <Label>
                        % of my services during the year will be performed
                        within Yonkers.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {missingFields.map((field, index) => (
              <div key={field.id} className="space-y-1.5">
                <Label htmlFor={field.id}>
                  {index + 1}. {field.label}
                </Label>
                <Input
                  id={field.id}
                  value={field.value}
                  onChange={(e) => onFieldUpdate(field.id, e.target.value)}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              </div>
            ))}

            <Button
              className="w-full"
              onClick={() => {
                onApplyMissing();
                onRefreshDocument();
              }}
            >
              Confirm Auto-fill ({missingFields.length})
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

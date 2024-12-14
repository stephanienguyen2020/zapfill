"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

export interface Field {
  id: string;
  label: string;
  value: string;
  category: "general" | "detailed" | "professional";
  status: "review" | "confirmed";
}

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

  return (
    <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">Review your auto-filled</h1>
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
            Filled Information ({filledFields.length})
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
                Auto-filled from profile
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
                    onCheckedChange={() => {}}
                  />
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      value={field.value}
                      onChange={(e) => onFieldUpdate(field.id, e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          field.category === "general"
                            ? "bg-blue-100 text-blue-700"
                            : field.category === "detailed"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {field.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        Review for accuracy
                      </span>
                    </div>
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
              Apply Information ({missingFields.length})
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

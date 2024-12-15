"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { ReviewForm, type Field } from "@/components/review-form";
import { DocumentPreview } from "@/components/document-preview";
import { useProfile } from "@/contexts/ProfileContext";
import { useDocument } from "@/contexts/DocumentContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useReviewDocument } from "@/contexts/ReviewDocumentContext";

export default function ReviewPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { profileInfo } = useProfile();
  const [isDocumentRefreshed, setIsDocumentRefreshed] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [filledFields, setFilledFields] = useState<Field[]>([]);
  const [documentName, setDocumentName] = useState<string>("");
  const { documentFile, documentMetadata } = useReviewDocument();
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pastScans, setPastScans] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const doc = params.get("document");
    if (doc) {
      setDocumentName(decodeURIComponent(doc));
    }
  }, []);

  useEffect(() => {
    console.log("Document in review page:", documentFile); // Debug log
  }, [documentFile]);

  const generateFieldsFromProfile = (): Field[] => {
    return [
      {
        id: "firstName",
        label: "First Name",
        value: profileInfo.firstName || "",
        type: "text",
        status: "review",
      },
      {
        id: "lastName",
        label: "Last Name",
        value: profileInfo.lastName || "",
        type: "text",
        status: "review",
      },
      {
        id: "ssn",
        label: "Social Security Number",
        value: profileInfo.ssn || "",
        type: "text",
        status: "review",
      },
      {
        id: "street",
        label: "Street Address",
        value: profileInfo.street || "",
        type: "text",
        status: "review",
      },
      {
        id: "city",
        label: "City",
        value: profileInfo.city || "",
        type: "text",
        status: "review",
      },
      {
        id: "state",
        label: "State",
        value: profileInfo.state || "",
        type: "text",
        status: "review",
      },
      {
        id: "zipCode",
        label: "ZIP Code",
        value: profileInfo.zipCode || "",
        type: "text",
        status: "review",
      },
      {
        id: "employerName",
        label: "Employer Name",
        value: profileInfo.employerName || "",
        type: "text",
        status: "review",
      },
      {
        id: "workEmail",
        label: "Work Email",
        value: profileInfo.workEmail || "",
        type: "text",
        status: "review",
      },
      {
        id: "workStreet",
        label: "Work Street Address",
        value: profileInfo.workStreet || "",
        type: "text",
        status: "review",
      },
      {
        id: "workAptNumber",
        label: "Work Suite/Room Number",
        value: profileInfo.workAptNumber || "",
        type: "text",
        status: "review",
      },
      {
        id: "workCity",
        label: "Work City",
        value: profileInfo.workCity || "",
        type: "text",
        status: "review",
      },
      {
        id: "workState",
        label: "Work State",
        value: profileInfo.workState || "",
        type: "text",
        status: "review",
      },
      {
        id: "workZipCode",
        label: "Work ZIP Code",
        value: profileInfo.workZipCode || "",
        type: "text",
        status: "review",
      },
      {
        id: "signature",
        label: "Signature",
        value: profileInfo.signature || "",
        type: "signature",
        status: "review",
      },
      {
        id: "date",
        label: "Date",
        value: "",
        type: "date",
        status: "review",
      },
    ];
  };

  useEffect(() => {
    const initialFields = generateFieldsFromProfile();

    const fieldsWithDate = initialFields.map((field) => {
      if (field.id === "date") {
        return {
          ...field,
          value: new Date().toISOString(),
        };
      }
      return field;
    });

    setFilledFields(fieldsWithDate);
  }, [profileInfo]);

  const [missingFields, setMissingFields] = useState<Field[]>([]);

  const handleFieldUpdate = (id: string, value: string) => {
    setFilledFields((prev) =>
      prev.map((field) => {
        if (field.id === id) {
          return {
            ...field,
            value,
            status: field.status === "confirmed" ? "review" : "confirmed",
          };
        }
        return field;
      })
    );
  };

  const handleConfirmAutoFill = () => {
    setFilledFields((prev) =>
      prev.map((field) => ({ ...field, status: "confirmed" }))
    );
  };

  const handleApplyMissing = () => {
    setIsDownloadReady(true);
  };

  const handleRefreshDocument = () => {
    setIsDocumentRefreshed(true);
    setTimeout(() => {
      setIsDownloadReady(true);
    }, 1500);
  };

  const handleDownload = () => {
    router.push("/download");
  };

  const handleStartFilling = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    handleRefreshDocument();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ReviewForm
              filledFields={filledFields}
              missingFields={missingFields}
              onFieldUpdate={handleFieldUpdate}
              onConfirmAutoFill={handleConfirmAutoFill}
              onApplyMissing={handleApplyMissing}
              onRefreshDocument={handleRefreshDocument}
            />
          </div>

          <div className="space-y-8">
            <DocumentPreview
              file={documentFile}
              onStartFilling={handleStartFilling}
              isProcessing={isProcessing}
            />

            <div>
              <h2 className="text-xl font-semibold mb-4">Past Scans</h2>
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select defaultValue="7">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastScans.map((scan) => (
                    <TableRow key={scan.id}>
                      <TableCell>{scan.name}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {scan.status}
                        </span>
                      </TableCell>
                      <TableCell>{scan.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

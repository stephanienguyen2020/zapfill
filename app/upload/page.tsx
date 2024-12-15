"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderUp, Search, Pencil, Upload, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ProgressTracker } from "@/components/progress-tracker";
import { DocumentPreview } from "@/components/document-preview";
import { useProfile } from "@/contexts/ProfileContext";

export default function UploadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { profileInfo } = useProfile();
  const [activeTab, setActiveTab] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [signature, setSignature] = useState<string | null>(null);
  const [documents, setDocuments] = useState<File[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<File | null>(null);
  const [uploadStep, setUploadStep] = useState<
    "uploading" | "processing" | "filling"
  >("uploading");
  const [isProcessing, setIsProcessing] = useState(false);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const pastScans = [
    { id: 1, name: "W2_2024.pdf", status: "Completed", date: "14 Dec 2024" },
    {
      id: 2,
      name: "Lease_Agreement_Final.docx",
      status: "Completed",
      date: "13 Dec 2024",
    },
    {
      id: 3,
      name: "Medical_Insurance_Claim_Form.pdf",
      status: "Completed",
      date: "12 Dec 2024",
    },
    {
      id: 4,
      name: "Driver_License_Update_Form.pdf",
      status: "Completed",
      date: "11 Dec 2024",
    },
  ];

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted", { profileInfo, signature, documents });
    toast({
      title: "Form Submitted",
      description: "Your form has been successfully submitted.",
    });
  };

  const handleSignatureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      try {
        const formData = new FormData();
        formData.append("file", files[0]);

        const response = await fetch("/api/upload-document", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        setSelectedDocument(files[0]);
        setUploadStep("processing");

        toast({
          title: "Success",
          description: "Document uploaded successfully",
        });
      } catch (error) {
        console.error("Error uploading document:", error);
        toast({
          title: "Error",
          description: "Failed to upload document",
        });
      }
    }
  };

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartFilling = async () => {
    setIsProcessing(true);
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setUploadStep("filling");
    router.push("/review");
  };

  const steps = [
    {
      label: "File Uploading",
      status:
        uploadStep === "uploading"
          ? "current"
          : uploadStep === "processing" || uploadStep === "filling"
          ? "completed"
          : "upcoming",
    },
    {
      label: "File Processing",
      status:
        uploadStep === "processing"
          ? "current"
          : uploadStep === "filling"
          ? "completed"
          : "upcoming",
    },
    {
      label: "File Filling",
      status: uploadStep === "filling" ? "current" : "upcoming",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto mb-8">
          <ProgressTracker steps={steps} />
        </div>

        {!selectedDocument ? (
          <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <FolderUp className="h-16 w-16 text-blue-500 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Drag & Drop or Choose file to upload
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Select document file
                </p>
                <Button onClick={() => documentInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
                <input
                  ref={documentInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleDocumentUpload}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                />
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {profileInfo?.preferredName || "User"}!
              </h1>
              <p className="text-gray-600 mb-6">
                Let us help you filling out another document today with AI!
              </p>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="general">General Information</TabsTrigger>
                  <TabsTrigger value="detailed">
                    Detailed Information
                  </TabsTrigger>
                  <TabsTrigger value="professional">
                    Professional Information
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        defaultValue={`${profileInfo.firstName} ${profileInfo.lastName}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="ssn">Social Security Number</Label>
                      <Input id="ssn" defaultValue={profileInfo.ssn} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={profileInfo.email}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          defaultValue={profileInfo.phoneNumber}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          defaultValue={profileInfo.dob}
                        />
                      </div>
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select defaultValue={profileInfo.gender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label>Electronic Signature</Label>
                      <div className="border rounded-lg p-4 relative">
                        {signature ? (
                          <img
                            src={signature}
                            alt="Signature"
                            className="w-full h-[100px] object-contain"
                          />
                        ) : (
                          <div className="w-full h-[100px] flex items-center justify-center text-gray-400">
                            No signature uploaded
                          </div>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => signatureInputRef.current?.click()}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit signature</span>
                        </Button>
                        <input
                          ref={signatureInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleSignatureUpload}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="flex items-center gap-2">
                        <span className="inline-block">🏠</span> Address
                      </Label>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="mailingAddress">
                            Mailing Address
                          </Label>
                          <Input
                            id="mailingAddress"
                            defaultValue={profileInfo.mailingAddress}
                          />
                        </div>
                        <div>
                          <Label htmlFor="permanentAddress">
                            Permanent Address
                          </Label>
                          <Input
                            id="permanentAddress"
                            defaultValue={profileInfo.permanentAddress}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="flex items-center gap-2">
                        <span className="inline-block">🪪</span> Identification
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="driversLicense">
                            Driver's License Number
                          </Label>
                          <Input
                            id="driversLicense"
                            defaultValue={profileInfo.driversLicense}
                          />
                        </div>
                        <div>
                          <Label htmlFor="stateId">State ID</Label>
                          <Input
                            id="stateId"
                            defaultValue={profileInfo.stateId}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <Label htmlFor="passport">Passport Number</Label>
                          <Input
                            id="passport"
                            defaultValue={profileInfo.passport}
                          />
                        </div>
                        <div>
                          <Label htmlFor="nationality">Nationality</Label>
                          <Input
                            id="nationality"
                            defaultValue={profileInfo.nationality}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="professional" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        defaultValue={profileInfo.jobTitle}
                      />
                    </div>
                    <div>
                      <Label htmlFor="employerName">Employer Name</Label>
                      <Input
                        id="employerName"
                        defaultValue={profileInfo.employerName}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="workEmail">Work Email</Label>
                        <Input
                          id="workEmail"
                          defaultValue={profileInfo.workEmail}
                        />
                      </div>
                      <div>
                        <Label htmlFor="workAddress">Work Address</Label>
                        <Input
                          id="workAddress"
                          defaultValue={profileInfo.workAddress}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="netWorth">Net Worth</Label>
                        <Input
                          id="netWorth"
                          defaultValue={profileInfo.netWorth}
                        />
                      </div>
                      <div>
                        <Label htmlFor="salaryRange">Salary Range</Label>
                        <Input
                          id="salaryRange"
                          defaultValue={profileInfo.salaryRange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="flex items-center gap-2">
                        <span className="inline-block">🏦</span> Financial
                        Details
                      </Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            defaultValue={profileInfo.bankName}
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            defaultValue={profileInfo.accountNumber}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Document Preview & Processing */}
            <div className="space-y-8">
              <DocumentPreview
                file={selectedDocument}
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
        )}
      </main>
    </div>
  );
}

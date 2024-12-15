"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useProfile } from "@/contexts/ProfileContext";
import { SignaturePad } from "@/components/signature-pad";

export default function UserProfile() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const { profileInfo, updateProfileInfo } = useProfile();

  const [dataPreferences, setDataPreferences] = useState({
    alwaysFillPhone: true,
    skipApartmentNumber: false,
    showEmail: true,
  });

  const [isSaved, setIsSaved] = useState(false);
  const [showSignaturePad, setShowSignaturePad] = useState(false);

  const handlePersonalInfoChange = (field: string, value: string) => {
    updateProfileInfo({ [field]: value });
  };

  const handleSignatureUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload-signature", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const data = await response.json();
        updateProfileInfo({ signature: data.filename });

        toast({
          title: "Success",
          description: "Signature uploaded successfully",
        });
      } catch (error) {
        console.error("Error uploading signature:", error);
        toast({
          title: "Error",
          description: "Failed to upload signature",
        });
      }
    }
  };

  const handleDataPreferenceToggle = (preference: string) => {
    setDataPreferences((prev) => ({
      ...prev,
      [preference]: !prev[preference as keyof typeof prev],
    }));
  };

  const handleSaveChanges = () => {
    console.log("Saving profile:", {
      personalInfo: profileInfo,
      signature: profileInfo.signature,
      dataPreferences,
    });

    setIsSaved(true);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });

    // Reset button text after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Manage Your Profile</h1>
        <p className="text-gray-600 mb-6">
          Update your personal details to make form-filling effortless.
        </p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="detailed">Detailed Information</TabsTrigger>
            <TabsTrigger value="professional">
              Professional Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileInfo.firstName}
                      onChange={(e) =>
                        handlePersonalInfoChange("firstName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileInfo.lastName}
                      onChange={(e) =>
                        handlePersonalInfoChange("lastName", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="ssn">Social Security Number</Label>
                  <Input
                    id="ssn"
                    value={profileInfo.ssn}
                    onChange={(e) =>
                      handlePersonalInfoChange("ssn", e.target.value)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileInfo.email}
                      onChange={(e) =>
                        handlePersonalInfoChange("email", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={profileInfo.phoneNumber}
                      onChange={(e) =>
                        handlePersonalInfoChange("phoneNumber", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileInfo.dob}
                      onChange={(e) =>
                        handlePersonalInfoChange("dob", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={profileInfo.gender}
                      onValueChange={(value) =>
                        handlePersonalInfoChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender">
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
                  <div className="border rounded-lg p-4">
                    {profileInfo.signature ? (
                      <div className="relative">
                        <Image
                          src={profileInfo.signature}
                          alt="Signature"
                          width={400}
                          height={100}
                          className="w-full h-[100px] object-contain"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => setShowSignaturePad(true)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    ) : (
                      <SignaturePad
                        onSave={(signature) => {
                          updateProfileInfo({ signature });
                          setShowSignaturePad(false);
                        }}
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="detailed">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={profileInfo.street}
                    onChange={(e) =>
                      handlePersonalInfoChange("street", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="aptNumber">Apartment Number (Optional)</Label>
                  <Input
                    id="aptNumber"
                    value={profileInfo.aptNumber}
                    onChange={(e) =>
                      handlePersonalInfoChange("aptNumber", e.target.value)
                    }
                    placeholder="Apt, Suite, Unit, etc."
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileInfo.city}
                      onChange={(e) =>
                        handlePersonalInfoChange("city", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileInfo.state}
                      onChange={(e) =>
                        handlePersonalInfoChange("state", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileInfo.zipCode}
                      onChange={(e) =>
                        handlePersonalInfoChange("zipCode", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="driversLicense">
                      Driver&apos;s License Number
                    </Label>
                    <Input
                      id="driversLicense"
                      value={profileInfo.driversLicense}
                      onChange={(e) =>
                        handlePersonalInfoChange(
                          "driversLicense",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="stateId">State ID</Label>
                    <Input
                      id="stateId"
                      value={profileInfo.stateId}
                      onChange={(e) =>
                        handlePersonalInfoChange("stateId", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="passport">Passport Number</Label>
                    <Input
                      id="passport"
                      value={profileInfo.passport}
                      onChange={(e) =>
                        handlePersonalInfoChange("passport", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={profileInfo.nationality}
                      onChange={(e) =>
                        handlePersonalInfoChange("nationality", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profileInfo.jobTitle}
                      onChange={(e) =>
                        handlePersonalInfoChange("jobTitle", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="employerName">Employer Name</Label>
                    <Input
                      id="employerName"
                      value={profileInfo.employerName}
                      onChange={(e) =>
                        handlePersonalInfoChange("employerName", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="workEmail">Work Email</Label>
                    <Input
                      id="workEmail"
                      value={profileInfo.workEmail}
                      onChange={(e) =>
                        handlePersonalInfoChange("workEmail", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="workAddress">Work Address</Label>
                    <Input
                      id="workAddress"
                      value={profileInfo.workAddress}
                      onChange={(e) =>
                        handlePersonalInfoChange("workAddress", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="netWorth">Net Worth</Label>
                    <Input
                      id="netWorth"
                      value={profileInfo.netWorth}
                      onChange={(e) =>
                        handlePersonalInfoChange("netWorth", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="salaryRange">Salary Range</Label>
                    <Input
                      id="salaryRange"
                      value={profileInfo.salaryRange}
                      onChange={(e) =>
                        handlePersonalInfoChange("salaryRange", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bankName">Bank Name</Label>
                    <Input
                      id="bankName"
                      value={profileInfo.bankName}
                      onChange={(e) =>
                        handlePersonalInfoChange("bankName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="accountNumber">Account Number</Label>
                    <Input
                      id="accountNumber"
                      value={profileInfo.accountNumber}
                      onChange={(e) =>
                        handlePersonalInfoChange(
                          "accountNumber",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Data Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(dataPreferences).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key}>
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={() => handleDataPreferenceToggle(key)}
                    className={cn(
                      "border-2",
                      value ? "border-white" : "border-black",
                      "[&>span]:border-2",
                      "[&>span]:border-black",
                      value && "[&>span]:border-white"
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Changes Button */}
        <div className="mt-6 text-center">
          <Button size="lg" onClick={handleSaveChanges} disabled={isSaved}>
            {isSaved ? "Saved" : "Save Changes"}
          </Button>
        </div>
      </main>
    </div>
  );
}

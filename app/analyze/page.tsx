'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderUp, Search, Pencil } from 'lucide-react'

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState('general')
  const [searchTerm, setSearchTerm] = useState('')

  const pastScans = [
    { id: 1, name: 'W2_2024.pdf', status: 'Completed', date: '14 Dec 2024' },
    { id: 2, name: 'Lease_Agreement_Final.docx', status: 'Completed', date: '13 Dec 2024' },
    { id: 3, name: 'Medical_Insurance_Claim_Form.pdf', status: 'Completed', date: '12 Dec 2024' },
    { id: 4, name: 'Driver_License_Update_Form.pdf', status: 'Completed', date: '11 Dec 2024' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Wafa!</h1>
            <p className="text-gray-600 mb-6">Let us help you filling out another document today with AI!</p>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="general">General Information</TabsTrigger>
                <TabsTrigger value="detailed">Detailed Information</TabsTrigger>
                <TabsTrigger value="professional">Professional Information</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Joseph Clark" />
                  </div>
                  <div>
                    <Label htmlFor="preferredName">Preferred Name</Label>
                    <Input id="preferredName" defaultValue="Joe" />
                  </div>
                  <div>
                    <Label htmlFor="ssn">Social Security Number</Label>
                    <Input id="ssn" defaultValue="123-45-6789" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="joeclark@gmail.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="(123)-(234)-(456)" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input id="dob" type="date" defaultValue="2000-09-24" />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select defaultValue="male">
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
                    <Label>Electric Signature</Label>
                    <div className="border rounded-lg p-4 relative">
                      <img 
                        src="/placeholder.svg?height=100&width=300" 
                        alt="Signature" 
                        className="w-full h-[100px] object-contain"
                      />
                      <Button size="sm" variant="ghost" className="absolute top-2 right-2">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit signature</span>
                      </Button>
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
                        <Label htmlFor="mailingAddress">Mailing Address</Label>
                        <Input id="mailingAddress" defaultValue="456 Oak Street, Apt 5B, Chicago, IL 60654, USA" />
                      </div>
                      <div>
                        <Label htmlFor="permanentAddress">Permanent Address</Label>
                        <Input id="permanentAddress" defaultValue="123 Maple Avenue, Springfield, IL 62701, USA" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <span className="inline-block">🪪</span> Identification
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="driversLicense">Driver's License Number</Label>
                        <Input id="driversLicense" defaultValue="S55512345" />
                      </div>
                      <div>
                        <Label htmlFor="stateId">State ID</Label>
                        <Input id="stateId" defaultValue="IL123456789" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label htmlFor="passport">Passport Number</Label>
                        <Input id="passport" defaultValue="P987654321" />
                      </div>
                      <div>
                        <Label htmlFor="nationality">Nationality</Label>
                        <Input id="nationality" defaultValue="US Citizen" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-4 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" defaultValue="Software Engineer" />
                  </div>
                  <div>
                    <Label htmlFor="employerName">Employer Name</Label>
                    <Input id="employerName" defaultValue="TechFlow Innovations" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workEmail">Work Email</Label>
                      <Input id="workEmail" defaultValue="joe.clark@techflow.com" />
                    </div>
                    <div>
                      <Label htmlFor="workAddress">Work Address</Label>
                      <Input id="workAddress" defaultValue="789 17th St, Chicago, IL 60654" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="netWorth">Net Worth</Label>
                      <Input id="netWorth" defaultValue="$250,000" />
                    </div>
                    <div>
                      <Label htmlFor="salaryRange">Salary Range</Label>
                      <Input id="salaryRange" defaultValue="$85,000 - $95,000 annually" />
                    </div>
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <span className="inline-block">🏦</span> Financial Details
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input id="bankName" defaultValue="Wells Fargo" />
                      </div>
                      <div>
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" defaultValue="987654321" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Upload & Past Scans */}
          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <FolderUp className="h-16 w-16 text-blue-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drag & Drop or Choose file to upload</h3>
                  <p className="text-sm text-gray-500 mb-4">Select code file</p>
                  <Button>Upload Document</Button>
                </div>
              </div>
            </Card>

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
  )
}


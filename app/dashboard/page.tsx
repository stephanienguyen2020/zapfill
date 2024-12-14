import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart, FileText, Upload, Edit, Download, Eye, Award } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen p-4">
          <nav className="space-y-2">
            <Link href="/dashboard" className="block px-4 py-2 rounded-md bg-gray-100 text-gray-700">Dashboard</Link>
            <Link href="/documents" className="block px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">Documents</Link>
            <Link href="/profile" className="block px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">Profile</Link>
            <Link href="/settings" className="block px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100">Settings</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, Stephanie!</h1>
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-600 mr-2">Profile 85% Complete</span>
              <Progress value={85} className="w-48" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p><strong>Name:</strong> Stephanie Ng</p>
                  <p><strong>Address:</strong> 123 Main St, New York, NY 10001</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Email:</strong> stephanie@example.com</p>
                  <p><strong>Signature:</strong> Uploaded</p>
                  <Link href="/profile">
                    <Button className="mt-4">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Info
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Job Onboarding Form", date: "2023-06-15", status: "Completed" },
                    { name: "Tax Form 1040", date: "2023-06-10", status: "In Progress" },
                    { name: "Rental Agreement", date: "2023-06-05", status: "Pending Review" },
                  ].map((doc, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">Uploaded on {doc.date}</p>
                        <p className="text-sm font-semibold text-blue-600">{doc.status}</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Link href="/upload">
              <Button className="w-full h-24 text-lg">
                <Upload className="w-6 h-6 mr-2" />
                Upload New Form
              </Button>
            </Link>
            <Link href="/review">
              <Button className="w-full h-24 text-lg" variant="secondary">
                <FileText className="w-6 h-6 mr-2" />
                Review Forms
              </Button>
            </Link>
            <Link href="/achievements">
              <Button className="w-full h-24 text-lg" variant="outline">
                <BarChart className="w-6 h-6 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>

          {/* Gamified Progress Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Your ZapFill Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Level 3: Form Master</span>
                <Progress value={60} className="w-48" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: "First Form Zap", description: "Completed first form" },
                  { name: "Speed Zapper", description: "Completed a form in under 5 minutes" },
                  { name: "Perfectionist", description: "Completed 5 forms without errors" },
                ].map((badge, index) => (
                  <div key={index} className="text-center">
                    <Award className="w-12 h-12 mx-auto text-yellow-500" />
                    <p className="font-semibold mt-2">{badge.name}</p>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}


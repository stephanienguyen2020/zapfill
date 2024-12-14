'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Upload } from 'lucide-react'

export default function DownloadPage() {
  const [isDownloading, setIsDownloading] = useState(false)
  const router = useRouter()

  const handleDownload = async () => {
    setIsDownloading(true)
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsDownloading(false)
    // In a real application, this would trigger the actual PDF download
    // The download would happen here instead of redirecting
  }

  const handleUploadNew = () => {
    router.push('/upload')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Your Document Is Ready for Download!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Your document is finalized and ready! Click the button below to download it instantly.
            Make sure to review it for any necessary changes before submission.
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              size="lg" 
              onClick={handleDownload}
              disabled={isDownloading}
            >
              <Download className="mr-2 h-5 w-5" />
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleUploadNew}
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload New
            </Button>
          </div>

          <Card className="p-8">
            <div className="text-left mb-4">
              <h2 className="text-xl font-semibold">Lease_Agreement_2024.pdf</h2>
              <p className="text-sm text-gray-500">5 Pages</p>
            </div>

            <div className="bg-white border rounded-lg">
              <div className="p-8">
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-xs text-gray-500">
                    ID: 678F1A7A-8479-49B6-801B-18006E008371
                  </div>

                  <h3 className="text-2xl font-bold text-center mb-6">
                    LEASE AGREEMENT
                  </h3>

                  <p className="text-sm">
                    Landlord agrees to rent to Tenant the "Leased Unit" and Tenant agrees to rent the Leased Unit under thefollowing terms and conditions:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold">1. PARTIES</h4>
                      <p className="text-sm">Tenant(s): Joseph Clark</p>
                      <p className="text-sm">Social Security Number: 1123-45-6789</p>
                      <p className="text-sm">Phone Number: (123)-(234)-(456)</p>
                      <p className="text-sm">State ID: IL123456789</p>
                      <p className="text-sm">Mailing Address: 456 Oak Street, Apt 5B, Chicago, IL 60654, USA</p>
                    </div>

                    <div>
                      <h4 className="font-bold">ADDRESS OF THE LEASED UNIT:</h4>
                      <p className="text-sm">123 W Madison St</p>
                      <p className="text-sm">Chicago, IL 60602</p>
                    </div>

                    <div>
                      <h4 className="font-bold">PROPERTY CONTACT INFORMATION:</h4>
                      <p className="text-sm">Maintenance: Maintenance requests via apartments.com portal</p>
                      <p className="text-sm">Email: fixrequest1@gmail.com</p>
                      <p className="text-sm">Phone: 856-219-0538</p>
                    </div>

                    {/* Preview cuts off here intentionally */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}


'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Eye, Download, Trash2, Upload } from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const initialDocuments = [
  { id: 1, name: "Job Onboarding Form", uploadDate: "2023-06-15", status: "Completed" },
  { id: 2, name: "Tax Form 1040", uploadDate: "2023-06-10", status: "In Progress" },
  { id: 3, name: "Rental Agreement", uploadDate: "2023-06-05", status: "Pending Review" },
  { id: 4, name: "Health Insurance Claim", uploadDate: "2023-06-20", status: "Completed" },
  { id: 5, name: "Travel Expense Report", uploadDate: "2023-06-18", status: "In Progress" },
]

export default function Documents() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOption, setSortOption] = useState('newest')
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([])

  const filteredAndSortedDocuments = documents
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'All' || doc.status === statusFilter)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id))
    setSelectedDocuments(selectedDocuments.filter(docId => docId !== id))
  }

  const handleDeleteSelected = () => {
    setDocuments(documents.filter(doc => !selectedDocuments.includes(doc.id)))
    setSelectedDocuments([])
  }

  const handleSelectDocument = (id: number) => {
    setSelectedDocuments(prev => 
      prev.includes(id) ? prev.filter(docId => docId !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredAndSortedDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredAndSortedDocuments.map(doc => doc.id))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-600 bg-green-100'
      case 'In Progress':
        return 'text-yellow-600 bg-yellow-100'
      case 'Pending Review':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Documents</h1>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3"
          />
          <div className="flex space-x-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Documents</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Document List */}
        {filteredAndSortedDocuments.length > 0 ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedDocuments.length === filteredAndSortedDocuments.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedDocuments.includes(doc.id)}
                        onCheckedChange={() => handleSelectDocument(doc.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{doc.name}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the document.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(doc.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Batch Actions */}
            {selectedDocuments.length > 0 && (
              <div className="mt-4 flex justify-end space-x-4">
                <Button variant="outline">
                  Download Selected
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      Delete Selected
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the selected documents.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteSelected}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}

            {/* Pagination (simplified for demonstration) */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredAndSortedDocuments.length} of {documents.length} documents
              </p>
              <div className="space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12">
            <p className="text-xl mb-4">You haven't uploaded any documents yet.</p>
            <Link href="/upload">
              <Button size="lg">
                <Upload className="w-6 h-6 mr-2" />
                Upload New Form
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}


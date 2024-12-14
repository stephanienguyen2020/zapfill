'use client'

import { useState } from 'react'
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, Upload } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Chatbot } from "@/components/Chatbot"
import './chatbot.css'

const faqs = [
  {
    question: "How do I upload a form?",
    answer: "To upload a form, navigate to the 'Upload' page from your dashboard. You can either drag and drop your form file into the designated area or click the 'Browse Files' button to select it from your device."
  },
  {
    question: "What file types are supported?",
    answer: "ZapFill supports a variety of file types including PDFs, Word documents (.doc, .docx), and image files (JPEG, PNG). We recommend using PDF format for the best results."
  },
  {
    question: "How do I edit my personal information?",
    answer: "You can edit your personal information by going to your Profile page. Click on your name in the top right corner and select 'Profile'. Here you can update all your personal details and preferences."
  },
  {
    question: "How is my data secured?",
    answer: "We take data security very seriously. All your data is encrypted both in transit and at rest. We use industry-standard security protocols and regularly perform security audits to ensure your information is protected."
  }
]

export default function HelpAndSupport() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [attachment, setAttachment] = useState<File | null>(null)

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }

  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAttachment(file)
    }
  }

  const handleSubmitRequest = () => {
    // In a real app, you would send this data to your backend
    console.log('Submitting support request:', { ...contactForm, attachment })
    toast({
      title: "Request Submitted",
      description: "Thank you for reaching out! Our support team will get back to you within 24 hours.",
    })
    // Reset form
    setContactForm({ name: '', email: '', subject: '', message: '' })
    setAttachment(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-gray-600 mb-6">We're here to help you get the most out of ZapFill.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name (optional)</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => handleContactFormChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => handleContactFormChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={(value) => handleContactFormChange('subject', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    value={contactForm.message}
                    onChange={(e) => handleContactFormChange('message', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="attachment">Attach File (optional)</Label>
                  <div className="flex items-center space-x-2">
                    <Button type="button" onClick={() => document.getElementById('attachment')?.click()}>
                      <Upload className="mr-2 h-4 w-4" /> Choose File
                    </Button>
                    <Input
                      id="attachment"
                      type="file"
                      className="hidden"
                      onChange={handleFileAttachment}
                    />
                    {attachment && <span className="text-sm text-gray-600">{attachment.name}</span>}
                  </div>
                </div>
                <Button type="button" onClick={handleSubmitRequest}>Send Request</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Chatbot */}
        <Chatbot />
      </main>
    </div>
  )
}


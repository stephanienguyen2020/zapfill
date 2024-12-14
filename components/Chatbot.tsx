'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  text: string
  isUser: boolean
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", isUser: false }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput('')
      setIsTyping(true)
      // Simulate bot response
      setTimeout(() => {
        setIsTyping(false)
        setMessages(prev => [...prev, { text: "Thank you for your message. Our support team will get back to you soon.", isUser: false }])
      }, 2000)
    }
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open Chat</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 w-80 sm:w-96 h-[32rem] flex flex-col shadow-2xl rounded-lg overflow-hidden"
          >
            <Card className="flex-1 flex flex-col">
              <CardHeader className="flex flex-row items-center border-b">
                <CardTitle className="text-lg">Support Chat</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex mb-4 ${
                        message.isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {!message.isUser && (
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src="/placeholder.svg" alt="Bot" />
                          <AvatarFallback>Bot</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.isUser && (
                        <Avatar className="w-8 h-8 ml-2">
                          <AvatarImage src="/placeholder.svg" alt="User" />
                          <AvatarFallback>Me</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage src="/placeholder.svg" alt="Bot" />
                        <AvatarFallback>Bot</AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


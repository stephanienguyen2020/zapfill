"use client";

import {
  ChatDialog,
  ChatDialogContent,
  ChatDialogHeader,
  ChatDialogTitle,
  ChatDialogTrigger,
} from "@/components/chat-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ChatSupport() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);

  return (
    <ChatDialog>
      <ChatDialogTrigger asChild>
        <Button variant="outline">Support Chat</Button>
      </ChatDialogTrigger>
      <ChatDialogContent className="sm:max-w-[425px] bg-white">
        <ChatDialogHeader>
          <ChatDialogTitle>Support Chat</ChatDialogTitle>
        </ChatDialogHeader>

        <div className="flex flex-col space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                message.role === "bot"
                  ? "bg-gray-100"
                  : "bg-blue-500 text-white ml-auto"
              }`}
            >
              {message.role === "bot" && (
                <p className="font-medium text-sm mb-1">Bot</p>
              )}
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem(
                "message"
              ) as HTMLInputElement;
              if (input.value.trim()) {
                setMessages([
                  ...messages,
                  { role: "user", content: input.value },
                ]);
                input.value = "";
              }
            }}
            className="flex gap-2"
          >
            <Input
              name="message"
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </ChatDialogContent>
    </ChatDialog>
  );
}

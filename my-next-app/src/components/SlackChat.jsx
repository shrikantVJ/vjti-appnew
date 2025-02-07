"use client"
import { useState } from 'react'
import { ChatMessage } from './ChatMessage'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const initialMessages = [
  {
    user: { name: 'John Doe', avatar: '/placeholder.svg?height=40&width=40' },
    content: 'Hey team, how\'s the project coming along?',
    timestamp: new Date(Date.now() - 3600000),
    initialReactions: [{ emoji: '👍', count: 2 }, { emoji: '🎉', count: 1 }],
  },
  {
    user: { name: 'Jane Smith', avatar: '/placeholder.svg?height=40&width=40' },
    content: 'Making good progress! We should be able to deliver on time.',
    timestamp: new Date(Date.now() - 1800000),
    initialReactions: [{ emoji: '🚀', count: 3 }],
  }
];

export function SlackChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          user: { name: 'You', avatar: '/placeholder.svg?height=40&width=40' },
          content: newMessage,
          timestamp: new Date(),
          initialReactions: [],
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-[88vh] flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-5 bg-white">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
}


'use client'

import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import type { Message } from '@/types/message'
import { MessageSquare } from 'lucide-react'

interface MessageListProps {
  messages: Message[]
}

export default function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // auto scroll to bottom when new message arrives
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
          <MessageSquare size={32} className="text-slate-400" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          No messages yet
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Send a message to start the conversation
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-4 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700 custom-scrollbar"
    >
      {messages.map((message, index) => (
        <MessageBubble key={`${message.timestamp}-${index}`} message={message} />
      ))}
      
      <div ref={bottomRef} />
    </div>
  )
}

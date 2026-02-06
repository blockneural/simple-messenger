'use client'

import type { Message } from '@/types/message'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isSent = message.isSent

  const formatTime = (timestamp: number) => {
    try {
      const date = new Date(timestamp)
      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      return `${hours}:${minutes}`
    } catch {
      return ''
    }
  }

  const truncateNodeId = (nodeId: string) => {
    if (!nodeId || nodeId.length < 16) return nodeId
    return `${nodeId.slice(0, 8)}...${nodeId.slice(-8)}`
  }

  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4 animate-slide-up`}>
      <div className={`max-w-[75%] ${isSent ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Sender info */}
        <div className={`text-xs text-slate-500 dark:text-slate-400 mb-1 px-1 ${isSent ? 'text-right' : 'text-left'}`}>
          {isSent ? 'You' : truncateNodeId(message.sender)}
        </div>

        {/* Message bubble */}
        <div
          className={`px-4 py-2.5 rounded-2xl break-words shadow-md transition-all hover:shadow-lg ${
            isSent
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-md'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-md'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.message}</p>
        </div>

        {/* Timestamp */}
        <div className={`text-xs text-slate-400 dark:text-slate-500 mt-1 px-1 ${isSent ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  )
}

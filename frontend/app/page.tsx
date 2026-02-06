'use client'

import { useState, useEffect } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'
import ReceiverInput from '@/components/ReceiverInput'
import MessageInput from '@/components/MessageInput'
import MessageList from '@/components/MessageList'
import { nodeIdSchema } from '@/lib/validation'
import { Copy, Check, User } from 'lucide-react'

export default function Home() {
  const [myNodeId, setMyNodeId] = useState<string>('')
  const [receiverNodeId, setReceiverNodeId] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const { connectionStatus, messages, sendMessage, error } = useWebSocket(myNodeId || null)

  // generate a random node ID on mount if not exists
  useEffect(() => {
    const stored = localStorage.getItem('myNodeId')
    if (stored && nodeIdSchema.safeParse(stored).success) {
      setMyNodeId(stored)
    } else {
      const randomId = generateRandomNodeId()
      setMyNodeId(randomId)
      localStorage.setItem('myNodeId', randomId)
    }
  }, [])

  const generateRandomNodeId = () => {
    const chars = '0123456789abcdef'
    let result = ''
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)]
    }
    return result
  }

  const handleSendMessage = (message: string) => {
    const isValidReceiver = nodeIdSchema.safeParse(receiverNodeId)
    
    if (!isValidReceiver.success) {
      console.error('Invalid receiver Node ID')
      return
    }

    if (!myNodeId) {
      console.error('Missing sender Node ID')
      return
    }

    sendMessage(receiverNodeId, message, myNodeId)
  }

  const copyNodeId = () => {
    if (myNodeId) {
      navigator.clipboard.writeText(myNodeId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const canSendMessage = receiverNodeId.length === 64 && connectionStatus.connected && myNodeId.length === 64

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Simple Messenger
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time messaging powered by WebSockets
          </p>
        </div>

        {/* Main Chat Container */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 space-y-6">
          {/* Connection Status & My Node ID */}
          <div className="space-y-3 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Status
              </span>
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${
                  connectionStatus.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}></span>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {connectionStatus.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>

            {/* My Node ID */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <User size={16} className="text-slate-400 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Your Node ID
                    </p>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                      {myNodeId}
                    </p>
                  </div>
                </div>
                <button
                  onClick={copyNodeId}
                  className="flex-shrink-0 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 
                    text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                  title="Copy Node ID"
                >
                  {copied ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-sm text-red-700 dark:text-red-400">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Receiver Input */}
          <ReceiverInput 
            onNodeIdChange={setReceiverNodeId}
            currentNodeId={receiverNodeId}
          />

          {/* Message List */}
          <MessageList messages={messages} />

          {/* Message Input */}
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={!canSendMessage}
            isConnected={connectionStatus.connected}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            💡 Share your Node ID with others to receive messages
          </p>
        </div>
      </div>
    </main>
  )
}

'use client'

import { useState } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'
import ReceiverInput from '@/components/ReceiverInput'
import MessageInput from '@/components/MessageInput'
import { nodeIdSchema } from '@/lib/validation'

export default function Home() {
  const [myNodeId, setMyNodeId] = useState<string>('a1b2c3d4e5f6789012345678901234567890123456789012345678901234abcd')
  const [receiverNodeId, setReceiverNodeId] = useState<string>('')
  const { connectionStatus, sendMessage } = useWebSocket(myNodeId)

  const handleSendMessage = (message: string) => {
    // validate receiver ID before sending
    const isValidReceiver = nodeIdSchema.safeParse(receiverNodeId)
    
    if (!isValidReceiver.success) {
      console.error('Invalid receiver Node ID')
      return
    }

    sendMessage(receiverNodeId, message, myNodeId)
  }

  const canSendMessage = receiverNodeId.length === 64 && connectionStatus.connected

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Simple Messenger
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Real-time messaging powered by WebSockets
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
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

          {/* Receiver Input */}
          <ReceiverInput 
            onNodeIdChange={setReceiverNodeId}
            currentNodeId={receiverNodeId}
          />

          {/* Message Input */}
          <MessageInput 
            onSendMessage={handleSendMessage}
            disabled={!canSendMessage}
            isConnected={connectionStatus.connected}
          />

          <p className="text-center text-slate-500 text-sm">
            Message display coming next... 📬
          </p>
        </div>
      </div>
    </main>
  )
}


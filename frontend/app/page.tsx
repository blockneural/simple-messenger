'use client'

import { useState } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'
import ReceiverInput from '@/components/ReceiverInput'

export default function Home() {
  const [myNodeId, setMyNodeId] = useState<string | null>(null)
  const [receiverNodeId, setReceiverNodeId] = useState<string>('')
  const { connectionStatus } = useWebSocket(myNodeId)

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

          <p className="text-center text-slate-500 text-sm">
            Message input coming next... 💬
          </p>
        </div>
      </div>
    </main>
  )
}


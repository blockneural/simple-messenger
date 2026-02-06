'use client'

import { useState } from 'react'
import { useWebSocket } from '@/hooks/useWebSocket'

export default function Home() {
  const [myNodeId, setMyNodeId] = useState<string | null>(null)
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

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6">
          <div className="text-center">
            <div className="mb-4">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                connectionStatus.connected ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className="text-slate-700 dark:text-slate-300">
                {connectionStatus.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <p className="text-slate-500">
              Components coming soon... 🚀
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}


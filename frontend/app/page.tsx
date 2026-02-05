'use client'

export default function Home() {
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
          <p className="text-center text-slate-500">
            Setting up components... 🚀
          </p>
        </div>
      </div>
    </main>
  )
}


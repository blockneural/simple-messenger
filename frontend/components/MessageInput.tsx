'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { messageSchema } from '@/lib/validation'
import { Send, Smile } from 'lucide-react'

const formSchema = z.object({
  message: messageSchema,
})

type FormData = z.infer<typeof formSchema>

interface MessageInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  isConnected?: boolean
}

export default function MessageInput({ onSendMessage, disabled, isConnected }: MessageInputProps) {
  const [isSending, setIsSending] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    if (!isConnected || disabled) return

    setIsSending(true)
    onSendMessage(data.message)
    reset()
    
    // simulate send delay for better UX
    setTimeout(() => {
      setIsSending(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(onSubmit)()
    }
  }

  const openEmojiPicker = () => {
    // trigger native emoji picker
    // Windows: Win + .
    // Mac: Cmd + Ctrl + Space
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="relative">
        <textarea
          {...register('message')}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          disabled={disabled || !isConnected}
          rows={3}
          className={`w-full px-4 py-3 pr-24 rounded-lg border bg-white dark:bg-slate-700 
            text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 transition-all resize-none
            ${errors.message 
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
              : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
            }
            ${(disabled || !isConnected) ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            type="button"
            onClick={openEmojiPicker}
            disabled={disabled || !isConnected}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-600 
              text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 
              transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Open emoji picker (Win + . or Cmd + Ctrl + Space)"
          >
            <Smile size={20} />
          </button>

          <button
            type="submit"
            disabled={disabled || !isConnected || isSending}
            className={`p-2 rounded-lg transition-all font-medium
              ${disabled || !isConnected || isSending
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {errors.message && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.message.message}
        </p>
      )}

      {!isConnected && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Waiting for connection...
        </p>
      )}

      <p className="text-xs text-slate-500 dark:text-slate-400">
        💡 Tip: Use Win + . (Windows) or Cmd + Ctrl + Space (Mac) for emojis
      </p>
    </form>
  )
}

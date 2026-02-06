'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { messageSchema } from '@/lib/validation'
import { Send, Smile } from 'lucide-react'
import dynamic from 'next/dynamic'
import type { EmojiClickData } from 'emoji-picker-react'

// Dynamically import EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { message: '' },
  })

  const messageValue = watch('message') || ''

  const onSubmit = async (data: FormData) => {
    if (!isConnected || disabled) return

    setIsSending(true)
    onSendMessage(data.message)
    reset()
    setShowEmojiPicker(false)
    
    // simulate send delay for better UX
    setTimeout(() => {
      setIsSending(false)
    }, 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      
      // Get current value directly from textarea
      const currentValue = (e.target as HTMLTextAreaElement).value
      
      if (!currentValue || !currentValue.trim()) {
        return // Don't submit if empty
      }
      
      if (!isConnected || disabled) return
      
      // Submit with current value
      setIsSending(true)
      onSendMessage(currentValue)
      reset()
      
      setTimeout(() => {
        setIsSending(false)
      }, 300)
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji
    const currentMessage = messageValue
    const newMessage = 
      currentMessage.slice(0, cursorPosition) + 
      emoji + 
      currentMessage.slice(cursorPosition)
    
    setValue('message', newMessage)
    setCursorPosition(cursorPosition + emoji.length)
    
    // Focus back on textarea
    if (textareaRef.current) {
      textareaRef.current.focus()
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = cursorPosition + emoji.length
          textareaRef.current.selectionEnd = cursorPosition + emoji.length
        }
      }, 0)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart)
  }

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  // Custom register to handle ref
  const { ref: registerRef, ...registerRest } = register('message')

  const handleRefCallback = (e: HTMLTextAreaElement | null) => {
    registerRef(e)
    if (e) {
      textareaRef.current = e
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="relative">
        <textarea
          {...registerRest}
          ref={handleRefCallback}
          onKeyDown={handleKeyDown}
          onChange={handleTextareaChange}
          placeholder="Type your message... (Enter to send)"
          disabled={disabled || !isConnected}
          rows={2}
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
            onClick={toggleEmojiPicker}
            disabled={disabled || !isConnected}
            className={`p-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              ${showEmojiPicker 
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            title="Toggle emoji picker"
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

        {/* Emoji Picker Popup */}
        {showEmojiPicker && (
          <div className="absolute bottom-full right-0 mb-2 z-50 animate-slide-up">
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(false)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm z-10 shadow-lg"
                title="Close"
              >
                ×
              </button>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={320}
                height={400}
                searchPlaceHolder="Search emoji..."
                previewConfig={{ showPreview: false }}
              />
            </div>
          </div>
        )}
      </div>

      {errors.message && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors.message.message}
        </p>
      )}

      {!isConnected && (
        <p className="text-xs text-amber-600 dark:text-amber-400">
          Waiting for connection...
        </p>
      )}
    </form>
  )
}

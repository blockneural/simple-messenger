'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { nodeIdSchema } from '@/lib/validation'
import { Check, X, User } from 'lucide-react'

const formSchema = z.object({
  nodeId: nodeIdSchema,
})

type FormData = z.infer<typeof formSchema>

interface ReceiverInputProps {
  onNodeIdChange: (nodeId: string) => void
  currentNodeId?: string
}

export default function ReceiverInput({ onNodeIdChange, currentNodeId }: ReceiverInputProps) {
  const [isValid, setIsValid] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const nodeIdValue = watch('nodeId')

  const onSubmit = (data: FormData) => {
    onNodeIdChange(data.nodeId)
    setIsValid(true)
  }

  // check validation on change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const result = nodeIdSchema.safeParse(value)
    if (result.success) {
      onNodeIdChange(value)
      setIsValid(true)
    } else {
      setIsValid(false)
      if (value.length > 0) {
        onNodeIdChange('') // Clear parent state if invalid
      }
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
        Receiver Node ID
      </label>
      
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <User size={18} />
        </div>
        
        <input
          {...register('nodeId', {
            onChange: handleChange
          })}
          type="text"
          placeholder="Enter 64-character hex Node ID"
          className={`w-full pl-10 pr-10 py-2.5 rounded-lg border bg-white dark:bg-slate-700 
            text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 transition-all
            ${errors.nodeId 
              ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
              : isValid && nodeIdValue
              ? 'border-green-300 focus:ring-green-500/20 focus:border-green-500'
              : 'border-slate-300 dark:border-slate-600 focus:ring-blue-500/20 focus:border-blue-500'
            }`}
        />

        {nodeIdValue && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {isValid ? (
              <Check size={18} className="text-green-500" />
            ) : (
              <X size={18} className="text-red-500" />
            )}
          </div>
        )}
      </div>

      {errors.nodeId && (
        <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <X size={12} />
          {errors.nodeId.message}
        </p>
      )}

      {isValid && nodeIdValue && !errors.nodeId && (
        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
          <Check size={12} />
          Valid Node ID
        </p>
      )}

      <p className="text-[10px] text-slate-500 dark:text-slate-400">
        Example: 62ffb058fd9bb911519b623d75301dc9f691b840fad90d67149f08655abbfd0f
      </p>
    </div>
  )
}

import { z } from 'zod'

// validate node ID - must be exactly 64 hex characters
export const nodeIdSchema = z
  .string()
  .length(64, 'Node ID must be exactly 64 characters')
  .regex(/^[a-fA-F0-9]{64}$/, 'Node ID must contain only hexadecimal characters')

export const messageSchema = z
  .string()
  .min(1, 'Message cannot be empty')
  .max(1000, 'Message is too long')

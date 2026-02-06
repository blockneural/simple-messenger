export interface Message {
  sender: string
  message: string
  timestamp: number
  isSent?: boolean
}

export interface MessageStatus {
  status: 'sent' | 'failed'
  reason?: string
}

export interface ConnectionStatus {
  connected: boolean
  registered: boolean
  nodeId?: string
}

import { useEffect, useState, useCallback } from 'react'
import { getSocket } from '@/lib/socket'
import type { Message, ConnectionStatus } from '@/types/message'

export const useWebSocket = (nodeId: string | null) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    registered: false,
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const socket = getSocket()

    // connection handlers
    socket.on('connect', () => {
      console.log('✅ Connected to server')
      setConnectionStatus(prev => ({ ...prev, connected: true }))
      setError(null)
      
      // register with node ID if we have one
      if (nodeId) {
        socket.emit('register', { node_id: nodeId })
      }
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected from server')
      setConnectionStatus({ connected: false, registered: false })
    })

    socket.on('connection_response', (data) => {
      console.log('📨 Connection response:', data)
    })

    socket.on('registered', (data) => {
      console.log('✅ Registered with Node ID:', data.node_id)
      setConnectionStatus(prev => ({
        ...prev,
        registered: true,
        nodeId: data.node_id,
      }))
    })

    socket.on('receive_message', (data: Message) => {
      console.log('📨 New message:', data)
      setMessages(prev => [...prev, { ...data, isSent: false }])
    })

    socket.on('message_status', (data) => {
      console.log('📊 Message status:', data)
      if (data.status === 'failed') {
        setError(data.reason || 'Failed to send message')
      }
    })

    socket.on('error', (data) => {
      console.error('❌ Error:', data.message)
      setError(data.message)
    })

    // connect to server
    if (!socket.connected) {
      socket.connect()
    }

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('connection_response')
      socket.off('registered')
      socket.off('receive_message')
      socket.off('message_status')
      socket.off('error')
    }
  }, [nodeId])

  const sendMessage = useCallback((receiver: string, message: string, sender: string) => {
    const socket = getSocket()
    
    if (!socket.connected) {
      setError('Not connected to server')
      return
    }

    const messageData = {
      sender,
      receiver,
      message,
      timestamp: Date.now(),
    }

    socket.emit('send_message', messageData)
    
    // add to local messages as sent
    setMessages(prev => [...prev, { ...messageData, isSent: true }])
    setError(null)
  }, [])

  return {
    connectionStatus,
    messages,
    error,
    sendMessage,
  }
}

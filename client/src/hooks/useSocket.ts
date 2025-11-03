import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocket(url: string) {
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Create socket connection
    socketRef.current = io(url, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    const socket = socketRef.current

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [url])

  return socketRef.current
}
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PlayerCard from "@/components/PlayerCard"
import type { Player } from "@/types"
import { useSocket } from "@/hooks/useSocket"

interface Room {
  id: string
  join_code: string
  players: Player[]
  status: string
}

export default function RoomPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)
  const socket = useSocket(import.meta.env.VITE_API_URL)

  // Get player info from localStorage
  const playerNickname = localStorage.getItem("nickname") || "guest"
  const playerAvatar = localStorage.getItem("avatar") || "/img/avatars/a1.jpg"

  // Fetch room details once
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/rooms/${roomId}`)
        if (!res.ok) throw new Error("Failed to fetch room")
        const data = await res.json()
        setRoom(data)
      } catch (err) {
        console.error("Error fetching room:", err)
      } finally {
        setLoading(false)
      }
    }

    if (roomId) fetchRoom()
  }, [roomId])

  // Socket.IO setup
  useEffect(() => {
    if (!socket || !roomId || !playerNickname) return

    // Join room via socket
    socket.emit('join_room', {
      room_id: roomId,
      player_nickname: playerNickname,
    })

    // Listen for player list updates
    socket.on('players_updated', (data: { players: Player[] }) => {
      console.log('Players updated:', data.players)
      setRoom((prevRoom) => {
        if (!prevRoom) return null
        return { ...prevRoom, players: data.players }
      })
    })

    // Listen for errors
    socket.on('error', (data: { message: string }) => {
      console.error('Socket error:', data.message)
      // TODO: Show error toast
    })

    // Cleanup
    return () => {
      socket.off('players_updated')
      socket.off('error')
      
      // Leave room when component unmounts
      socket.emit('leave_room', { room_id: roomId })
    }
  }, [socket, roomId, playerNickname])

  // Handle leaving room
  const handleLeaveRoom = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/rooms/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: roomId,
          player_nickname: playerNickname,
        }),
      })
      
      // Socket will emit leave_room in cleanup
      navigate('/')
    } catch (error) {
      console.error('Error leaving room:', error)
      // Navigate anyway
      navigate('/')
    }
  }

  if (loading) return <div className="text-center text-white mt-16">Loading room...</div>
  if (!room) return <div className="text-center text-red-500 mt-16">Room not found.</div>

  return (
    <div className="h-screen w-full flex flex-col bg-[url('/img/background.jpg')] bg-repeat">
      <div className="mx-16 mt-8 mb-4 flex justify-between items-center">
        <div className="text-7xl text-primary-500 font-bold">doodle.io</div>
        <div className="flex items-center gap-4">
          <div className="text-xl text-white pr-2">
            <div>Join Code</div>
            <div className="font-bold">{room.join_code}</div>
          </div>
          <button
            onClick={handleLeaveRoom}
            className="cursor-pointer transition-all bg-red-500 text-white px-4 py-2 rounded-lg border-red-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Leave Room
          </button>
        </div>
      </div>

      <main className="flex-1 mx-16 min-h-0 mb-16">
        <div className="grid grid-cols-12 gap-2 h-full">
          <div className="col-span-2 flex flex-col gap-2 overflow-y-auto">
            {room.players.map((p, i) => (
              <PlayerCard key={p.nickname} index={i} player={p} />
            ))}
          </div>

          <div className="col-span-7 bg-white/50 rounded-sm flex items-center justify-center">
            <div>🎨 Canvas</div>
          </div>

          <div className="col-span-3 bg-white/50 rounded-sm flex items-center justify-center">
            <div>💬 Chat</div>
          </div>
        </div>
      </main>
    </div>
  )
}

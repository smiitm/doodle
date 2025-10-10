import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PlayerCard from "@/components/PlayerCard"
import type { Player } from "@/types"

interface Room {
  id: string
  join_code: string
  players: Player[]
  status: string
}

export default function RoomPage() {
  const { roomId } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [loading, setLoading] = useState(true)

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

  

  if (loading) return <div className="text-center text-white mt-16">Loading room...</div>
  if (!room) return <div className="text-center text-red-500 mt-16">Room not found.</div>

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="mx-16 mt-8 mb-4 flex justify-between items-center">
        <div className="text-7xl text-primary-500 font-bold">doodle.io</div>
        <div className="text-xl text-white pr-2">
          <div>Join Code</div>
          <div>{room.join_code}</div>
        </div>
      </div>

      <main className="flex-1 mx-16 min-h-0 mb-16">
        <div className="grid grid-cols-12 gap-2 h-full">
          <div className="col-span-2 flex flex-col gap-2 overflow-y-auto">
            {room.players.map((p, i) => (
              <PlayerCard key={i} index={i} player={p} />
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

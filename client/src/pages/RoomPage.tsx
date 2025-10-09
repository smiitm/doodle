// import { useParams } from "react-router-dom"
import type { Player } from "@/types"
import PlayerCard from "@/components/PlayerCard"

export default function RoomPage() {

  // const { roomId } = useParams() 
  const players: Player[] = [] // TODO: fetch players from roomId
  const joinCode = 696969 // TODO: fetch join code from roomId

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="mx-16 mt-8 mb-4 flex justify-between items-center">
        <div className="text-7xl text-primary-500 font-bold">doodle.io</div>
        <div className="text-xl text-white pr-2">
          <div>Join Code</div>
          <div>{joinCode}</div>
        </div>
      </div>
      <div className="mx-16 mb-2">
        <div className="bg-white h-16 rounded-md"></div>
      </div>

      <main className="flex-1 mx-16 min-h-0 mb-16">
        <div className="grid grid-cols-12 gap-2 h-full">
          <div className="col-span-2 flex flex-col gap-2 overflow-y-auto">
            {players.map((p, i) => (
              <PlayerCard key={p.id} index={i} player={p} />
            ))}
          </div>

          {/* Canvas */}
          <div className="col-span-7 bg-white/50 rounded-sm">CANVAS</div>

          {/* Chat */}
          <div className="col-span-3 bg-white/50 rounded-sm">CHAT</div>
        </div>
      </main>
    </div>
  )
}
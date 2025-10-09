import type { Player } from "@/types"

interface PlayerCardProps {
    index: number
    player: Player
}

export default function PlayerCard({ index, player }: PlayerCardProps) {
    return (
        <div className="h-16 w-full border-2">
            <div className="grid grid-cols-6 bg-white h-full text-black">
                <div className="col-span-1 w-full p-1">#{index + 1}</div>
                <div className="col-span-3 w-full text-center my-auto">
                    {player.nickname}
                </div>
                <div className="col-span-2 w-full flex items-center justify-center bg-primary-500">
                    {player.avatar ? (
                        <img
                            src={player.avatar}
                            alt={`${player.nickname} avatar`}
                            className="h-12 w-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-12 w-12 rounded-full bg-white/70" />
                    )}
                </div>
            </div>
        </div>
    )
}

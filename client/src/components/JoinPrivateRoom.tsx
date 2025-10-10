import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useNavigate } from "react-router-dom"

interface JoinRoomButtonProps {
  nickname: string
  avatar: string
}

export default function JoinPrivateRoom({ nickname, avatar }: JoinRoomButtonProps) {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleJoin = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_nickname: nickname,
          player_avatar: avatar,
          join_code: code,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to join room')
      }

      const data = await response.json()
      navigate(`/room/${data.id}`)
    } catch (error) {
      console.error(error)
      // TODO : Add an error toast here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <button className="w-full cursor-pointer transition-all bg-primary-500 text-xl text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          Join Private Room
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Joining Code</DialogTitle>
          <DialogDescription>
            You need to enter a valid 6-digit alphanumeric code to join a private room.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between">
          <InputOTP maxLength={6} onChange={(val) => setCode(val)}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <button
            onClick={handleJoin}
            className="cursor-pointer transition-all bg-primary-500 text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

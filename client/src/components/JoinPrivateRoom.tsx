// import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"


export default function JoinPrivateRoom() {
  // const [code, setCode] = useState("")

  const handleJoin = async () => {
    // TODO: validate code and join room
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
          {/* <InputOTP maxLength={6} onChange={(val) => setCode(val.toUpperCase())}> */}
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <button
            onClick={handleJoin}
            className="cursor-pointer transition-all bg-primary-500 text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Join
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

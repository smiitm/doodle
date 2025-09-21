import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { ThemeProvider } from "@/components/theme-provider"



export default function HomePage() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen relative overflow-hidden bg-[url('/img/background.jpg')] bg-repeat">

        <div className="my-16">
          <h1 className="text-8xl font-bold mb-4 text-center text-primary-500">
            doodle.io
          </h1>
        </div>

        <div className="w-1/4 mx-auto flex flex-col gap-2">
          <div className="flex gap-2 w-full">
            <div className="w-1/2">
              <button className="w-full cursor-pointer transition-all bg-primary-500 text-xl text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Play
              </button>
            </div>
            <div className="w-1/2">
              <button className="w-full cursor-pointer transition-all bg-primary-500 text-xl text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                Creat Room
              </button>
            </div>
          </div>

          <div className="w-full">
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
                <div className="flex justify-between ">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <button className="cursor-pointer transition-all bg-primary-500 text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    Join
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="w-1/4 mx-auto my-16 flex justify-center text-white gap-2">
          Avatar Builder to be added.
        </div>
      </div>
    </ThemeProvider>
  )
}

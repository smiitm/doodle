import { useEffect, useState } from "react"
import { ThemeProvider } from "@/components/ui/theme-provider"
import PlayButton from "@/components/PlayButton"
import CreateRoomButton from "@/components/CreateRoomButton"
import JoinPrivateRoom from "../components/JoinPrivateRoom"
import UserProfile from "@/components/UserProfile"

export default function HomePage() {
  const [profile, setProfile] = useState<{ nickname: string; avatar: string }>({
    nickname: "guest",
    avatar: "/img/avatars/a1.jpg",
  })

  // Load saved profile when page opens
  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname")
    const savedAvatar = localStorage.getItem("avatar")

    if (savedNickname && savedAvatar) {
      setProfile({ nickname: savedNickname, avatar: savedAvatar })
    }
  }, [])

  // Save to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem("nickname", profile.nickname)
    localStorage.setItem("avatar", profile.avatar)
  }, [profile])

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
              <PlayButton />
            </div>
            <div className="w-1/2">
              <CreateRoomButton nickname={profile.nickname} avatar={profile.avatar} />
            </div>
          </div>

          <div className="w-full">
            <JoinPrivateRoom nickname={profile.nickname} avatar={profile.avatar} />
          </div>
        </div>

        <div className="w-1/4 mx-auto my-16 flex flex-col gap-4 text-white">
          <UserProfile value={profile} onChange={setProfile} />
        </div>
      </div>
    </ThemeProvider>
  )
}

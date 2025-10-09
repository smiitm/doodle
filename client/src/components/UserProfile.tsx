import { useState } from "react"

interface UserProfileProps {
  value?: { nickname: string; avatar: string }
  onChange?: (value: { nickname: string; avatar: string }) => void
}

const AVATARS = [
  "/img/avatars/a1.jpg",
  "/img/avatars/a2.jpg",
  "/img/avatars/a3.jpg",
  "/img/avatars/a4.jpg",
  "/img/avatars/a5.jpg",
]

export default function UserProfile({ value, onChange }: UserProfileProps) {
  const [nickname, setNickname] = useState(value?.nickname ?? "")
  const [avatar, setAvatar] = useState(value?.avatar ?? AVATARS[0])

  const handleNicknameChange = (val: string) => {
    setNickname(val)
    onChange?.({ nickname: val, avatar })
  }

  const handleAvatarSelect = (src: string) => {
    setAvatar(src)
    onChange?.({ nickname, avatar: src })
  }

  return (
    <div className="w-full bg-white/80 rounded-lg p-4 text-black">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Nickname</label>
        <input
          value={nickname}
          onChange={(e) => handleNicknameChange(e.target.value)}
          placeholder="Enter your nickname"
          className="w-full rounded-md border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="mb-2">
        <label className="block text-sm font-medium mb-2">Choose an avatar</label>
        <div className="grid grid-cols-5 gap-2">
          {AVATARS.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => handleAvatarSelect(src)}
              className={`relative rounded-md overflow-hidden border-2 ${
                avatar === src ? "border-primary-500" : "border-transparent"
              }`}
            >
              <img src={src} alt="avatar" className="h-16 w-16 object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}



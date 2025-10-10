import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface CreateRoomButtonProps {
  nickname: string
  avatar: string
}

export default function CreateRoomButton({ nickname, avatar }: CreateRoomButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_private: true,
          owner_nickname: nickname,
          owner_avatar: avatar,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create room')
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
    <button
      className="w-full cursor-pointer transition-all bg-primary-500 text-xl text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
      onClick={handleCreateRoom}
      disabled={isLoading}
    >
      {isLoading ? 'Creating...' : 'Create Room'}
    </button>
  )
}

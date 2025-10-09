// Room & Player shape should match backend response
export interface Player {
  id: string
  nickname: string
  avatar?: string
  score: number
  is_owner: boolean
}

export interface Room {
  id: string
  name: string
  capacity: number
  code: string
  created_at: string
  players: Player[]
}

// Events we expect from server
export interface ServerToClientEvents {
  player_joined: (payload: { roomId: string; player: Player }) => void
  error: (payload: { message: string }) => void
}

// Events we send to server
export interface ClientToServerEvents {
  join_room: (payload: { roomId: string; nickname: string; avatar?: string }) => void
}

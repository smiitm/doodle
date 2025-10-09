// interface CreateRoomButtonProps {
//   nickname: string
//   avatar: string
// }

export default function CreateRoomButton() {

  const handleCreateRoom = async () => {
    // TODO: create room and join
  }

  return (
    <button
      className="w-full cursor-pointer transition-all bg-primary-500 text-xl text-white px-6 py-2 rounded-lg border-primary-600 border-b-[4px] hover:-translate-y-[1px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
      onClick={handleCreateRoom}
    >
      Create Room
    </button>
  )
}

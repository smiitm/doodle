from fastapi import APIRouter, HTTPException 
from app.utils import generate_joincode
import datetime
import uuid
from app.schemas.room import CreateRoomResponse, CreateRoomPayload, Room, JoinRoomPayload, Player, LeaveRoomPayload
from app.state import active_rooms, join_code_to_room_id

router = APIRouter(
    prefix="/rooms",
    tags=["rooms"],
)


@router.post("/create", response_model=CreateRoomResponse)
def create_room(request: CreateRoomPayload):
    room_id = str(uuid.uuid4())
    join_code = generate_joincode()

    room_model = Room(
        id=room_id,
        join_code=join_code,
        created_at=datetime.datetime.utcnow(),
        is_private=request.is_private,
        owner_nickname=request.owner_nickname,
        owner_avatar=request.owner_avatar,
        status="waiting",
        players=[Player(
            nickname=request.owner_nickname,
            avatar=request.owner_avatar,
            is_owner=True,
        )],
    )
    active_rooms[room_id] = room_model
    join_code_to_room_id[join_code] = room_id
    
    return CreateRoomResponse(
        id=room_id,
        join_code=join_code,
    )


@router.post("/join", response_model=CreateRoomResponse)
def join_room(request: JoinRoomPayload):
    room_id = join_code_to_room_id.get(request.join_code)
    room = active_rooms.get(room_id)

    if not room:
        raise HTTPException(status_code=404, detail="Room not found with that join code.")

    if any(p.nickname == request.player_nickname for p in room.players):
        raise HTTPException(status_code=409, detail="Nickname already taken in this room.")

    room.players.append(Player(
        nickname=request.player_nickname,
        avatar=request.player_avatar,
        is_owner=False,
    ))

    return CreateRoomResponse(
        id=room.id,
        join_code=room.join_code,
    )


@router.post("/leave")
def leave_room(request: LeaveRoomPayload):
    room = active_rooms.get(request.room_id)
    
    if not room:
        raise HTTPException(status_code=404, detail="Room not found.")
    
    # Update player list
    initial_count = len(room.players)
    room.players = [p for p in room.players if p.nickname != request.player_nickname]
    
    if len(room.players) == initial_count:
        raise HTTPException(status_code=404, detail="Player not found in room.")
    
    # If owner left, assign new owner or delete room
    if len(room.players) == 0:
        del active_rooms[request.room_id]
        if room.join_code in join_code_to_room_id:
            del join_code_to_room_id[room.join_code]
    elif not any(p.is_owner for p in room.players):
        # Make first player the new owner
        room.players[0].is_owner = True
        room.owner_nickname = room.players[0].nickname
        room.owner_avatar = room.players[0].avatar
    
    return {"message": "Left room successfully"}


@router.get("/{room_id}", response_model=Room)
def get_room(room_id: str):
    room = active_rooms.get(room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found.")
    return room
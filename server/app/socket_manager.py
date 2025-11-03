import socketio
from typing import Dict, Set
from app.state import active_rooms, join_code_to_room_id
from app.schemas.room import Player

sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*',
    logger=True,
    engineio_logger=True
)

# Track which socket is in which room
socket_to_room: Dict[str, str] = {}
room_to_sockets: Dict[str, Set[str]] = {}
socket_to_nickname: Dict[str, str] = {}  # socket id -> player nickname



@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")


@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
    
    # Handle player leaving
    if sid in socket_to_room:
        room_id = socket_to_room[sid]
        await handle_player_leave(sid, room_id)


@sio.event
async def join_room(sid, data):
    """
    Client sends: { room_id: str, player_nickname: str }
    """
    room_id = data.get('room_id')
    player_nickname = data.get('player_nickname')
    
    if not room_id or not player_nickname:
        await sio.emit('error', {'message': 'Missing room_id or player_nickname'}, room=sid)
        return
    
    room = active_rooms.get(room_id)
    if not room:
        await sio.emit('error', {'message': 'Room not found'}, room=sid)
        return
    
    # Track socket-room relationship
    socket_to_room[sid] = room_id
    # Track socket -> nickname mapping so disconnects can remove the correct player
    socket_to_nickname[sid] = player_nickname
    if room_id not in room_to_sockets:
        room_to_sockets[room_id] = set()
    room_to_sockets[room_id].add(sid)
    
    # Join Socket.IO room
    await sio.enter_room(sid, room_id)
    
    # Emit updated player list to all clients in the room
    await emit_player_list(room_id)
    
    print(f"Player {player_nickname} joined room {room_id}")


@sio.event
async def leave_room(sid, data):
    """
    Client sends: { room_id: str }
    """
    room_id = data.get('room_id')
    if room_id:
        await handle_player_leave(sid, room_id)


async def handle_player_leave(sid: str, room_id: str):
    """Handle player leaving a room"""
    room = active_rooms.get(room_id)
    if not room:
        return
    # Find and remove player from room using socket->nickname mapping if available
    nickname = socket_to_nickname.get(sid)
    if nickname:
        initial_count = len(room.players)
        room.players = [p for p in room.players if p.nickname != nickname]
        # If the player was the owner and left, handle ownership transfer / room deletion
        if len(room.players) == 0:
            # delete room
            if room_id in active_rooms:
                del active_rooms[room_id]
            if room.join_code in join_code_to_room_id:
                del join_code_to_room_id[room.join_code]
        elif not any(p.is_owner for p in room.players):
            room.players[0].is_owner = True
            room.owner_nickname = room.players[0].nickname
            room.owner_avatar = room.players[0].avatar

    # Clean up tracking
    if sid in socket_to_room:
        del socket_to_room[sid]
    if room_id in room_to_sockets:
        room_to_sockets[room_id].discard(sid)
        if not room_to_sockets[room_id]:
            del room_to_sockets[room_id]
    
    # Leave Socket.IO room
    await sio.leave_room(sid, room_id)
    
    # Emit updated player list
    await emit_player_list(room_id)
    
    print(f"Player left room {room_id}")


async def emit_player_list(room_id: str):
    """Emit updated player list to all clients in a room"""
    room = active_rooms.get(room_id)
    if not room:
        return
    
    players_data = [player.model_dump() for player in room.players]
    await sio.emit('players_updated', {'players': players_data}, room=room_id)


async def broadcast_to_room(room_id: str, event: str, data: dict):
    """Helper function to broadcast events to a room"""
    await sio.emit(event, data, room=room_id)
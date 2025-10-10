from app.schemas.room import Room
from typing import Dict, Tuple

active_rooms: Dict[str, Room] = {}
join_code_to_room_id: Dict[str, str] = {}
sid_to_player: Dict[str, Tuple[str, str]] = {}

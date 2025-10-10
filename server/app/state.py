from app.schemas.room import Room
from typing import Dict

active_rooms: Dict[str, Room] = {}

join_code_to_room_id: dict[str, str] = {}
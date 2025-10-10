from pydantic import BaseModel
import datetime

class Player(BaseModel):
    nickname: str
    avatar: str
    points: int = 0
    is_owner: bool = False

class Room(BaseModel):
    id: str
    created_at: datetime.datetime
    join_code: str
    is_private: bool
    owner_nickname: str
    owner_avatar: str
    status: str # waiting, playing, finished
    players: list[Player] = []
    
class CreateRoomPayload(BaseModel):
    is_private: bool
    owner_nickname: str
    owner_avatar: str
    
class CreateRoomResponse(BaseModel):
    id : str
    join_code: str

class JoinRoomPayload(BaseModel):
    join_code: str
    player_nickname: str
    player_avatar: str

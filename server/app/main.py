from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

from app.routers import rooms

# Initialize FastAPI and Socket.IO
app = FastAPI()
sio = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins='*'
)
socket_app = socketio.ASGIApp(sio, app)

# Include routers
app.include_router(rooms.router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/healthz")
async def health_check():
    return {"status": "ok"}
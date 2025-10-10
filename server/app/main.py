import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import rooms
from app.socket_manager import sio

app = FastAPI()

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

socket_app = socketio.ASGIApp(sio, other_asgi_app=app)
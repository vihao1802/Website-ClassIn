import json
from typing import Dict, List

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter(prefix="/ws", tags=["WebSocket"])


class ConnectionManager:

    # This class is used to manage the connections and broadcast messages to all connected clients.
    def __init__(self) -> None:
        self.active_connections: List[WebSocket] = []

    # This method is used to connect a new client to the WebSocket server.
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    # This method is used to disconnect a client from the WebSocket server.
    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    # This method is used to send a message to a specific client.
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    # This method is used to broadcast a message to all connected clients.
    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@router.websocket("/tai-khoan/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            typeAction = await websocket.receive_text()
            """ db_latest_message = (
                db.query(models.TinNhan,models.TaiKhoan)
                .join(
                        models.TaiKhoan,
                        models.TinNhan.ma_taiKhoan == models.TaiKhoan.ma_taiKhoan,
                    )
                .filter(models.TinNhan.ma_taiKhoan == client_id)
                .filter(models.TinNhan.ma_nhomChat == chatGroup_id)
                .order_by(desc(models.TinNhan.thoiGianGui))
                .first()
            ) """
            """ if db_latest_message:
                TinNhan, TaiKhoan = db_latest_message
                message = {
                    'ten_taiKhoan': TaiKhoan.hoTen,
                    'anTinNhan': TinNhan.anTinNhan,
                    'ma_nhomChat': TinNhan.ma_nhomChat,
                    'ma_taiKhoan': TinNhan.ma_taiKhoan,
                    'ma_tinNhan': TinNhan.ma_tinNhan,
                    'noiDung': TinNhan.noiDung,
                    'thoiGianGui': TinNhan.thoiGianGui.strftime('%Y-%m-%dT%H:%M:%S')
                } """

            message = {"sendById": client_id, "type": typeAction}
            await manager.broadcast(json.dumps(message))
    except WebSocketDisconnect:
        manager.disconnect(websocket)


@router.websocket("/tai-khoan/{client_id}/nhan-tin-ban-be")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket)
    try:
        while True:
            typeAction = await websocket.receive_text()
            message = {"sendById": client_id, "type": typeAction}
            await manager.broadcast(json.dumps(message))
    except WebSocketDisconnect:
        manager.disconnect(websocket)

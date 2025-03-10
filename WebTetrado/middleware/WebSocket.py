from django.urls import resolve
from web_socket.connection import WebSocket

def websockets(app):
    async def asgi(scope, receive, send):
        if scope["type"] == "websocket":
            match = resolve('/ws/')
            await match.func(WebSocket(scope, receive, send), *match.args, **match.kwargs)
            return
        await app(scope, receive, send)
    return asgi

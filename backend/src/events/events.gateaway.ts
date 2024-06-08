import { OnModuleInit } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: [process.env.CLIENT_URL || 'https://fitin-client.vercel.app']
  }
})
export class EventsGateway implements OnModuleInit {
  private onlineUsers = {}

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', socket => {
      const userId = socket.handshake.query.userId as string

      if (userId) this.onlineUsers[userId] = socket.id

      this.server.emit('getOnlineUsers', Object.keys(this.onlineUsers))

      socket.on('disconnect', () => {
        delete this.onlineUsers[userId]
        this.server.emit('getOnlineUsers', this.onlineUsers)

        console.log(socket.id, 'disconnected')
      })
    })
  }

  private getRecieverId(id: string) {
    return this.onlineUsers[id]
  }

  newMessage(receiverId: string, message: any) {
    const id = this.getRecieverId(receiverId)

    if (id) this.server.to(id).emit('newMessage', message)
  }
}

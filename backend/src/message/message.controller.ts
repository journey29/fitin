import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard'

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(private readonly messagesService: MessageService) {}

  @Get(':id')
  getMessages(
    @Param('id') receiverId: string,
    @CurrentUser('id') senderId: string
  ) {
    return this.messagesService.getMessages(receiverId, senderId)
  }

  @Post('send/:id')
  sendMessage(
    @Body('body') body: string,
    @CurrentUser('id') senderId: string,
    @Param('id') receiverId: string
  ) {
    return this.messagesService.sendMessage({ body, senderId, receiverId })
  }
}

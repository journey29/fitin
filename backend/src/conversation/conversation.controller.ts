import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard'

@UseGuards(JwtAuthGuard)
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get()
  getConversations(@CurrentUser('id') senderId: string) {
    return this.conversationService.getConversations(senderId)
  }

  @Post('add/:id')
  addConversation(
    @CurrentUser('id') senderId: string,
    @Param('id') receiverId: string
  ) {
    return this.conversationService.addConversation({ senderId, receiverId })
  }
}

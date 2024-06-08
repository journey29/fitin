import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { MessageDto } from './dto/message.dto'
import { EventsGateway } from 'src/events/events.gateaway'

@Injectable()
export class MessageService {
  constructor(
    private prismaService: PrismaService,
    private gateawayService: EventsGateway
  ) {}

  async getMessages(receiverId: string, senderId: string) {
    const conversation = await this.prismaService.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [receiverId, senderId]
        }
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    if (!conversation) {
      return []
    }

    return conversation.messages
  }

  async sendMessage(messageDto: MessageDto) {
    const { body, receiverId, senderId } = messageDto

    let conversation = await this.prismaService.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [receiverId, senderId]
        }
      }
    })

    if (!conversation) {
      conversation = await this.prismaService.conversation.create({
        data: {
          participantIds: {
            set: [receiverId, senderId]
          }
        }
      })
    }

    const newMessage = await this.prismaService.message.create({
      data: {
        senderId,
        body,
        conversationId: conversation.id
      }
    })

    if (newMessage) {
      conversation = await this.prismaService.conversation.update({
        where: {
          id: conversation.id
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id
            }
          }
        }
      })
    }

    this.gateawayService.newMessage(receiverId, newMessage)

    return newMessage
  }
}

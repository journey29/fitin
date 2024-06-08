import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ConversationService {
  constructor(private prismaService: PrismaService) {}

  async getConversations(senderId: string) {
    const conversations = await this.prismaService.conversation.findMany({
      where: {
        participantIds: { has: senderId }
      },
      include: {
        participants: {
          select: {
            email: true,
            name: true,
            id: true
          }
        }
      }
    })

    const participants = conversations.flatMap(conversation =>
      conversation.participants.filter(
        participant => participant.id !== senderId
      )
    )

    return participants
  }

  async addConversation(conversationDto: {
    receiverId: string
    senderId: string
  }) {
    const { receiverId, senderId } = conversationDto

    const validReceiverId = await this.prismaService.user.findUnique({
      where: {
        id: receiverId
      }
    })

    if (!validReceiverId) {
      throw new BadRequestException('There is no user with sush an id!')
    }

    const existingConversation =
      await this.prismaService.conversation.findFirst({
        where: {
          participantIds: { hasEvery: [receiverId, senderId] }
        }
      })

    if (existingConversation) {
      throw new BadRequestException('This user already is your contact!')
    }

    const conversation = await this.prismaService.conversation.create({
      data: {
        participantIds: { set: [receiverId, senderId] },
        participants: {
          connect: [{ id: receiverId }, { id: senderId }]
        }
      }
    })

    if (!conversation) {
      throw new BadRequestException('Conversation was not created!')
    }

    return conversation
  }
}

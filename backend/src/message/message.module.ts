import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageController } from './message.controller'
import { PrismaService } from 'src/prisma.service'
import { EventsModule } from 'src/events/events.module'
import { EventsGateway } from 'src/events/events.gateaway'

@Module({
  imports: [EventsModule],
  controllers: [MessageController],
  providers: [MessageService, PrismaService, EventsGateway]
})
export class MessagesModule {}

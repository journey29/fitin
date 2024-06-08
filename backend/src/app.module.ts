import { Module } from '@nestjs/common'
import { EventsModule } from './events/events.module'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { MessagesModule } from './message/message.module'
import { ConversationModule } from './conversation/conversation.module'

@Module({
  imports: [
    EventsModule,
    AuthModule,
    UserModule,
    MessagesModule,
    ConversationModule
  ],
  providers: [PrismaService]
})
export class AppModule {}

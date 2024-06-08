import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import { PrismaService } from 'src/prisma.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService, JwtStrategy]
})
export class AuthModule {}

import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getAll(authUserId: string) {
    return this.prismaService.user.findMany({
      where: {
        id: { not: authUserId }
      }
    })
  }

  getUser(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }

  getById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id }
    })
  }

  createUser(userDto: UserDto) {
    return this.prismaService.user.create({
      data: userDto
    })
  }
}

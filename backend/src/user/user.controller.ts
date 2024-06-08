import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers(@CurrentUser('id') authUserId: string) {
    return this.userService.getAll(authUserId)
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.userService.getById(id)
  }
}

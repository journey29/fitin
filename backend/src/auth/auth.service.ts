import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { UserService } from 'src/user/user.service'
import { hash, verify } from 'argon2'
import { RegisterDto } from './dto/register.dto'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'

@Injectable()
export class AuthService {
  REFRESH_TOKEN_NAME = 'refreshToken'
  REFRESH_TOKEN_EXPIRES_DATE = 7

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto

    const existingUser = await this.userService.getUser(email)

    if (!existingUser) {
      throw new UnauthorizedException('User does not exist yet!')
    }

    const passwordMatch = await verify(existingUser.password, password)

    if (!passwordMatch) {
      throw new BadRequestException('Password dont match!')
    }

    const tokens = this.generateTokens(existingUser.id)

    return { existingUser, ...tokens }
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userService.getUser(registerDto.email)

    if (existingUser) {
      throw new UnauthorizedException('User already exist!')
    }

    const hashedPassword = await hash(registerDto.password)

    const user = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword
    })

    const tokens = this.generateTokens(user.id)

    return { user, ...tokens }
  }

  private generateTokens(id: string) {
    const data = { id }

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
      secret: process.env.JWT_SECRET
    })

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET
    })

    return { accessToken, refreshToken }
  }

  addRefreshTokenToCookies(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.REFRESH_TOKEN_EXPIRES_DATE)

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      expires: expiresIn,
      sameSite: 'lax',
      httpOnly: true,
      secure: true
    })
  }

  removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      expires: new Date(0),
      sameSite: 'lax',
      httpOnly: true,
      secure: true
    })
  }

  getNewTokens(token: string) {
    const validatedRefreshToken = this.jwtService.verify(token)
    if (!validatedRefreshToken) throw new UnauthorizedException()

    const { accessToken, refreshToken } = this.generateTokens(
      validatedRefreshToken.id
    )

    return { accessToken, refreshToken }
  }
}

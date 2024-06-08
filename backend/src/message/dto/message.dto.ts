import { IsEmail, IsString } from 'class-validator'

export class MessageDto {
  @IsEmail()
  body: string

  @IsString()
  receiverId: string

  @IsString()
  senderId: string
}

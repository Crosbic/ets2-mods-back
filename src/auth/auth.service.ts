import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { SignInDto } from './dto/SignIn.dto'
import { SignUpDto } from './dto/SignUp.dto'
import { AuthResponse } from './types/AuthResponse'

@Injectable()
export class AuthService {
  @Inject()
  private readonly usersService: UsersService

  @Inject()
  private readonly jwtService: JwtService

  @Inject()
  private readonly configService: ConfigService

  @InjectRepository(UserEntity)
  private readonly usersRepository: Repository<UserEntity>

  public async signUp(userDto: SignUpDto): Promise<AuthResponse> {
    const user = this.usersRepository.create(userDto)
    const savedUser = await this.usersRepository.save(user)

    return this.generateTokens(savedUser)
  }

  public async signIn(userDto: SignInDto): Promise<AuthResponse> {
    const { username, password } = userDto
    const user = await this.usersService.findOne(username)

    if (user?.password !== password) {
      throw new UnauthorizedException()
    }

    return this.generateTokens(user)
  }

  private generateTokens(user: UserEntity): AuthResponse {
    const payload = {
      id: user.id,
      username: user.username,
    }

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '60s',
    })

    return {
      access_token: accessToken,
    }
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { SignUpDto } from './dto/SignUp.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,

    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  async signUp(userDto: SignUpDto): Promise<UserEntity> {
    const newUser = this.usersRepository.create(userDto)
    return this.usersRepository.save(newUser)
  }

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload = {
      sub: user.id,
      username: user.username,
    }
    return {
      acces_token: await this.jwtService.signAsync(payload),
    }
  }
}

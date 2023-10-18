import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateUserDto } from './dto/createUser.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findOne(user: any): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({
      where: {
        username: user.username,
      },
    })
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(userDto)
    return this.userRepository.save(newUser)
  }
}

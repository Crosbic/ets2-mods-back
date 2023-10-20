import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ormConfig } from './TypeORM.config'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

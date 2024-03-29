import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Event } from '../event/event.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ParachuteUser } from '../parachute/parachute.user.entity';
import { EventUser } from '../event/event.user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event, ParachuteUser, EventUser]),
    JwtModule,
  ],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

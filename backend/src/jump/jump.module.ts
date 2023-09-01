import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jump } from './jump.entity';
import { JumpsController } from './jumps.controller';
import { JumpsService } from './jumps.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jump, User]), JwtModule],
  providers: [
    JumpsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [JumpsController],
})
export class JumpModule {}

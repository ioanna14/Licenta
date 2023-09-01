import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parachute } from './parachute.entity';
import { ParachutesController } from './parachutes.controller';
import { ParachutesService } from './parachutes.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { ParachuteUser } from './parachute.user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parachute, User, ParachuteUser]),
    JwtModule,
  ],
  providers: [
    ParachutesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [ParachutesController],
})
export class ParachuteModule {}

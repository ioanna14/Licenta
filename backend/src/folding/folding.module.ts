import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folding } from './folding.entity';
import { FoldingsController } from './foldings.controller';
import { FoldingsService } from './foldings.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { Parachute } from '../parachute/parachute.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folding, Parachute, User]), JwtModule],
  providers: [
    FoldingsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [FoldingsController],
})
export class FoldingModule {}

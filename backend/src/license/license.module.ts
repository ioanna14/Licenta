import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './license.entity';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { User } from '../user/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([License, User]), JwtModule],
  providers: [
    LicensesService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [LicensesController],
})
export class LicenseModule {}

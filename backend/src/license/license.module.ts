import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './license.entity';
import { LicensesController } from './licenses.controller';
import { LicensesService } from './licenses.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([License, User])],
  providers: [LicensesService],
  controllers: [LicensesController],
})
export class LicenseModule {}

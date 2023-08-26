import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './emergencyContact.entity';
import { EmergencyContactsController } from './emergencyContacts.controller';
import { EmergencyContactsService } from './emergencyContacts.service';
import { User } from '../user/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyContact, User]), JwtModule],
  providers: [
    EmergencyContactsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [EmergencyContactsController],
})
export class EmergencyContactModule {}

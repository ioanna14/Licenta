import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmergencyContact } from './emergencyContact.entity';
import { EmergencyContactsController } from './emergencyContacts.controller';
import { EmergencyContactsService } from './emergencyContacts.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmergencyContact, User])],
  providers: [EmergencyContactsService],
  controllers: [EmergencyContactsController],
})
export class EmergencyContactModule {}

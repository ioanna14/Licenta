import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EmergencyContact} from './emergencyContact.entity';
import {EmergencyContactsController} from './emergencyContacts.controller';
import {EmergencyContactsService} from './emergencyContacts.service';

@Module({
    imports: [TypeOrmModule.forFeature([EmergencyContact])],
    providers: [EmergencyContactsService],
    controllers: [EmergencyContactsController],
})
export class EmergencyContactsModule {
}
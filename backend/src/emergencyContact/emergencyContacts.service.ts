import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateEmergencyContactDto} from './dto/create-emergency-contact.dto';
import {EmergencyContact} from './emergencyContact.entity';

@Injectable()
export class EmergencyContactsService {
    constructor(
        @InjectRepository(EmergencyContact)
        private readonly emergencyContactsRepository: Repository<EmergencyContact>,
    ) {
    }

    create(createEmergencyContactDto: CreateEmergencyContactDto): Promise<EmergencyContact> {
        const emergencyContact = new EmergencyContact();
        emergencyContact.name = createEmergencyContactDto.name;
        emergencyContact.phone = createEmergencyContactDto.phone;
        emergencyContact.email = createEmergencyContactDto.email;
        emergencyContact.address = createEmergencyContactDto.address;
        // emergencyContact.user = ?
        return this.emergencyContactsRepository.save(emergencyContact);
    }

    async findAll(): Promise<EmergencyContact[]> {
        return this.emergencyContactsRepository.find();
    }

    findOne(id: number): Promise<EmergencyContact> {
        return this.emergencyContactsRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.emergencyContactsRepository.delete(id);
    }
}
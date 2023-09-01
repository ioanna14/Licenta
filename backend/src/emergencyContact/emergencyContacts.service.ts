import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { EmergencyContact } from './emergencyContact.entity';
import { User } from '../user/user.entity';

@Injectable()
export class EmergencyContactsService {
  constructor(
    @InjectRepository(EmergencyContact)
    private readonly emergencyContactsRepository: Repository<EmergencyContact>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createEmergencyContactDto: CreateEmergencyContactDto,
  ): Promise<any> {
    const emergencyContact = new EmergencyContact();
    emergencyContact.name = createEmergencyContactDto.name;
    emergencyContact.phone = createEmergencyContactDto.phone;
    emergencyContact.email = createEmergencyContactDto.email;
    emergencyContact.address = createEmergencyContactDto.address;

    try {
      await this.emergencyContactsRepository
        .save(emergencyContact)
        .then((emergencyContact) => {
          const user = new User();
          user.emergencyContact = emergencyContact;
          this.userRepository.update(createEmergencyContactDto.userId, user);
        });
      return {
        success: true,
        message: 'General data added!',
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async findAll(): Promise<EmergencyContact[]> {
    return this.emergencyContactsRepository.find();
  }

  findOne(id: number): Promise<EmergencyContact> {
    return this.emergencyContactsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.emergencyContactsRepository.delete(id);
  }
}

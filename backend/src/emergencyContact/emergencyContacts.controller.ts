import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { EmergencyContact } from './emergencyContact.entity';
import { EmergencyContactsService } from './emergencyContacts.service';

@Controller('')
export class EmergencyContactsController {
  constructor(
    private readonly emergencyContactsService: EmergencyContactsService,
  ) {}

  @Post('/add-emergency-contact')
  async create(
    @Body() createEmergencyContactDto: CreateEmergencyContactDto,
  ): Promise<any> {
    return this.emergencyContactsService.create(createEmergencyContactDto);
  }

  @Get('get-emergency-contact')
  findAll(): Promise<EmergencyContact[]> {
    return this.emergencyContactsService.findAll();
  }
}

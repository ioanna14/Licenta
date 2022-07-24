import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateEmergencyContactDto} from './dto/create-emergency-contact.dto';
import {EmergencyContact} from './emergencyContact.entity';
import {EmergencyContactsService} from './emergencyContacts.service';

@Controller('emergency-contacts')
export class EmergencyContactsController {
    constructor(private readonly emergencyContactsService: EmergencyContactsService) {
    }

    @Post()
    create(@Body() createEmergencyContactDto: CreateEmergencyContactDto): Promise<EmergencyContact> {
        return this.emergencyContactsService.create(createEmergencyContactDto);
    }

    @Get()
    findAll(): Promise<EmergencyContact[]> {
        return this.emergencyContactsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<EmergencyContact> {
        return this.emergencyContactsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.emergencyContactsService.remove(id);
    }
}
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateLicenseDto} from './dto/create-license.dto';
import {License} from './license.entity';
import {LicensesService} from './licenses.service';

@Controller('licenses')
export class LicensesController {
    constructor(private readonly licensesService: LicensesService) {
    }

    @Post()
    create(@Body() createLicenseDto: CreateLicenseDto): Promise<License> {
        return this.licensesService.create(createLicenseDto);
    }

    @Get()
    findAll(): Promise<License[]> {
        return this.licensesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<License> {
        return this.licensesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.licensesService.remove(id);
    }
}
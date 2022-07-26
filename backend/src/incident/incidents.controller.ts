import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateIncidentDto} from './dto/create-incident.dto';
import {Incident} from './incident.entity';
import {IncidentsService} from './incidents.service';

@Controller('incidents')
export class IncidentsController {
    constructor(private readonly incidentsService: IncidentsService) {
    }

    @Post()
    create(@Body() createIncidentDto: CreateIncidentDto): Promise<Incident> {
        return this.incidentsService.create(createIncidentDto);
    }

    @Get()
    findAll(): Promise<Incident[]> {
        return this.incidentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Incident> {
        return this.incidentsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.incidentsService.remove(id);
    }
}
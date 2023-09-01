import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { IncidentsService } from './incidents.service';

@Controller()
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post('/add-incident')
  async create(@Body() createIncidentDto: CreateIncidentDto): Promise<any> {
    return await this.incidentsService.create(createIncidentDto);
  }

  @Get('/get-incidents/all')
  async findAll(): Promise<any> {
    return await this.incidentsService.findAll();
  }
}

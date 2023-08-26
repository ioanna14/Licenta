import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './event.entity';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/add-event')
  create(@Body() createEventDto: CreateEventDto): Promise<any> {
    return this.eventsService.create(createEventDto);
  }

  @Post('/add-participant-to-event')
  addParticipant(@Body() userId: number, eventId: number): Promise<any> {
    return this.eventsService.addParticipant(userId, eventId);
  }

  @Get('/get-events/all')
  findAll(): Promise<any> {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(id);
  }
}

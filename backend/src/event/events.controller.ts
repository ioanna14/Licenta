import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/add-event')
  create(@Body() createEventDto: CreateEventDto): Promise<any> {
    return this.eventsService.create(createEventDto);
  }

  @Post('/add-participant-to-event')
  addParticipant(@Body() data): Promise<any> {
    return this.eventsService.addParticipant(data.userId, data.eventId);
  }

  @Get('/get-events/all')
  findAll(): Promise<any> {
    return this.eventsService.findAll();
  }

  @Get('/get-events/:id')
  findAllForUser(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.eventsService.findAllForUser(id);
  }
}

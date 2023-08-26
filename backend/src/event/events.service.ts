import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../user/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<any> {
    const event = new Event();
    event.title = createEventDto.title;
    event.description = createEventDto.description;
    event.date = createEventDto.date;
    event.price = createEventDto.price;
    event.location = createEventDto.location;
    event.image = createEventDto.image;

    try {
      return await this.eventsRepository.save(event).then((event) => {
        return {
          success: true,
          message: event.id,
        };
      });
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async addParticipant(userId: number, eventId: number): Promise<any> {
    const event = new Event();
    const user = await this.usersRepository.findOneBy({ id: userId });
    event.participants.push(user);
    try {
      await this.eventsRepository.update(eventId, event);
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

  async findAll(): Promise<any> {
    try {
      return {
        success: true,
        message: await await this.eventsRepository.find(),
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}

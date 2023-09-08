import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../user/user.entity';
import { EventUser } from './event.user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(EventUser)
    private readonly eventUserRepository: Repository<EventUser>,
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
    try {
      await this.eventUserRepository.save({
        eventId: eventId,
        userId: userId,
      });
      return {
        success: true,
        message: 'Participant joined!',
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
        message: await this.eventsRepository.find(),
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async findAllForUser(id: number): Promise<any> {
    try {
      const events = [];
      return {
        success: true,
        message: await this.eventUserRepository
          .findBy({
            userId: id,
          })
          .then(async (eventsUsers) => {
            if (eventsUsers.length > 1) {
              eventsUsers.map(async (participant) => {
                const event = await this.eventsRepository.findOneBy({
                  id: participant.eventId,
                });
                if (event) {
                  events.push(event);
                }
              });
            } else if (eventsUsers.length === 1) {
              const event = await this.eventsRepository.findOneBy({
                id: eventsUsers[0].eventId,
              });
              if (event) {
                events.push(event);
              }
            }
          })
          .then(() => {
            return events;
          }),
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { Incident } from './incident.entity';
import { User } from '../user/user.entity';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentsRepository: Repository<Incident>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createIncidentDto: CreateIncidentDto): Promise<any> {
    const incident = new Incident();
    incident.type = createIncidentDto.type;
    incident.description = createIncidentDto.description;
    incident.image = createIncidentDto.image;
    incident.dropzone = createIncidentDto.dropzone;
    incident.date = createIncidentDto.date;
    incident.user = await this.usersRepository.findOneBy({
      id: createIncidentDto.userId,
    });

    try {
      return {
        success: true,
        message: await this.incidentsRepository.save(incident),
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
        message: await this.incidentsRepository.find(),
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  findOne(id: number): Promise<Incident> {
    return this.incidentsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.incidentsRepository.delete(id);
  }
}

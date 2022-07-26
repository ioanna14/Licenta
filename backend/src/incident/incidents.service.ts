import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateIncidentDto} from './dto/create-incident.dto';
import {Incident} from './incident.entity';

@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private readonly incidentsRepository: Repository<Incident>,
    ) {
    }

    create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
        const incident = new Incident();
        incident.type = createIncidentDto.type;
        incident.description = createIncidentDto.description;
        // incident.jump = createIncidentDto.jump;

        return this.incidentsRepository.save(incident);
    }

    async findAll(): Promise<Incident[]> {
        return this.incidentsRepository.find();
    }

    findOne(id: number): Promise<Incident> {
        return this.incidentsRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.incidentsRepository.delete(id);
    }
}
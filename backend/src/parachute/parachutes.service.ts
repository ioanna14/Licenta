import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateParachuteDto} from './dto/create-parachute.dto';
import {Parachute} from './parachute.entity';

@Injectable()
export class ParachutesService {
    constructor(
        @InjectRepository(Parachute)
        private readonly parachutesRepository: Repository<Parachute>,
    ) {
    }

    create(createParachuteDto: CreateParachuteDto): Promise<Parachute> {
        const parachute = new Parachute();
        parachute.type = createParachuteDto.type;
        parachute.foldings = createParachuteDto.foldings;
        parachute.reserveParachuteId = createParachuteDto.reserveParachuteId;

        return this.parachutesRepository.save(parachute);
    }

    async findAll(): Promise<Parachute[]> {
        return this.parachutesRepository.find();
    }

    findOne(id: number): Promise<Parachute> {
        return this.parachutesRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.parachutesRepository.delete(id);
    }
}
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreatePlaneDto} from './dto/create-plane.dto';
import {Plane} from './plane.entity';

@Injectable()
export class PlanesService {
    constructor(
        @InjectRepository(Plane)
        private readonly planesRepository: Repository<Plane>,
    ) {
    }

    create(createPlaneDto: CreatePlaneDto): Promise<Plane> {
        const plane = new Plane();
        // plane.type = createPlaneDto.type;
        // plane.foldings = createPlaneDto.foldings;
        // plane.reservePlaneId = createPlaneDto.reservePlaneId;

        return this.planesRepository.save(plane);
    }

    async findAll(): Promise<Plane[]> {
        return this.planesRepository.find();
    }

    findOne(id: number): Promise<Plane> {
        return this.planesRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.planesRepository.delete(id);
    }
}
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateDropzoneDto} from './dto/create-dropzone.dto';
import {Dropzone} from './dropzone.entity';

@Injectable()
export class DropzonesService {
    constructor(
        @InjectRepository(Dropzone)
        private readonly dropzonesRepository: Repository<Dropzone>,
    ) {
    }

    create(createDropzoneDto: CreateDropzoneDto): Promise<Dropzone> {
        const dropzone = new Dropzone();
        // dropzone.type = createDropzoneDto.type;
        // dropzone.description = createDropzoneDto.description;
        // dropzone.jump = createDropzoneDto.jump;

        return this.dropzonesRepository.save(dropzone);
    }

    async findAll(): Promise<Dropzone[]> {
        return this.dropzonesRepository.find();
    }

    findOne(id: number): Promise<Dropzone> {
        return this.dropzonesRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.dropzonesRepository.delete(id);
    }
}
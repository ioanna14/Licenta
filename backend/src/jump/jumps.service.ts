import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateJumpDto} from './dto/create-jump.dto';
import {Jump} from './jump.entity';

@Injectable()
export class JumpsService {
    constructor(
        @InjectRepository(Jump)
        private readonly jumpsRepository: Repository<Jump>,
    ) {
    }

    create(createJumpDto: CreateJumpDto): Promise<Jump> {
        const jump = new Jump();
        // jump.type = createJumpDto.type;
        // jump.description = createJumpDto.description;
        // jump.jump = createJumpDto.jump;

        return this.jumpsRepository.save(jump);
    }

    async findAll(): Promise<Jump[]> {
        return this.jumpsRepository.find();
    }

    findOne(id: number): Promise<Jump> {
        return this.jumpsRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.jumpsRepository.delete(id);
    }
}
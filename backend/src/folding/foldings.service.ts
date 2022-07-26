import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateFoldingDto} from './dto/create-folding.dto';
import {Folding} from './folding.entity';

@Injectable()
export class FoldingsService {
    constructor(
        @InjectRepository(Folding)
        private readonly foldingsRepository: Repository<Folding>,
    ) {
    }

    create(createFoldingDto: CreateFoldingDto): Promise<Folding> {
        const folding = new Folding();
        folding.date = createFoldingDto.date;
        folding.expirationDate = createFoldingDto.expirationDate;
        // folding.parachute = createFoldingDto.parachute;

        return this.foldingsRepository.save(folding);
    }

    async findAll(): Promise<Folding[]> {
        return this.foldingsRepository.find();
    }

    findOne(id: number): Promise<Folding> {
        return this.foldingsRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.foldingsRepository.delete(id);
    }
}
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateLicenseDto} from './dto/create-license.dto';
import {License} from './license.entity';

@Injectable()
export class LicensesService {
    constructor(
        @InjectRepository(License)
        private readonly licensesRepository: Repository<License>,
    ) {
    }

    create(createLicenseDto: CreateLicenseDto): Promise<License> {
        const license = new License();
        license.category = createLicenseDto.category;
        license.releaseDate = createLicenseDto.releaseDate;
        license.expirationDate = createLicenseDto.expirationDate;
        // license.user = ?
        return this.licensesRepository.save(license);
    }

    async findAll(): Promise<License[]> {
        return this.licensesRepository.find();
    }

    findOne(id: number): Promise<License> {
        return this.licensesRepository.findOneBy({id: id});
    }

    async remove(id: string): Promise<void> {
        await this.licensesRepository.delete(id);
    }
}
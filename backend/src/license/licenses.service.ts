import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLicenseDto } from './dto/create-license.dto';
import { License } from './license.entity';
import { User } from '../user/user.entity';

@Injectable()
export class LicensesService {
  constructor(
    @InjectRepository(License)
    private readonly licensesRepository: Repository<License>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createLicenseDto: CreateLicenseDto): Promise<any> {
    const license = new License();
    license.identifier = createLicenseDto.identifier;
    license.category = createLicenseDto.category;
    license.releaseDate = createLicenseDto.releaseDate;
    license.expirationDate = createLicenseDto.expirationDate;
    try {
      await this.licensesRepository.save(license).then((license) => {
        const user = new User();
        user.license = license;
        this.userRepository.update(createLicenseDto.userId, user);
      });
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

  async findAll(): Promise<License[]> {
    return this.licensesRepository.find();
  }

  findOne(id: number): Promise<License> {
    return this.licensesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.licensesRepository.delete(id);
  }
}

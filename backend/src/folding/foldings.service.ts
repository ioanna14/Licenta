import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoldingDto } from './dto/create-folding.dto';
import { Folding } from './folding.entity';
import { Parachute } from '../parachute/parachute.entity';
import { User } from '../user/user.entity';

@Injectable()
export class FoldingsService {
  constructor(
    @InjectRepository(Folding)
    private readonly foldingsRepository: Repository<Folding>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Parachute)
    private readonly parachutesRepository: Repository<Parachute>,
  ) {}

  async create(createFoldingDto: CreateFoldingDto): Promise<any> {
    const folding = new Folding();
    folding.date = createFoldingDto.date;
    const user = await this.userRepository.findOneBy({
      id: createFoldingDto.folder,
    });
    folding.folderName = user.name;
    folding.parachute = await this.parachutesRepository.findOneBy({
      id: createFoldingDto.parachute,
    });

    try {
      return await this.foldingsRepository.save(folding).then((folding) => {
        return {
          success: true,
          message: {
            id: folding.id,
            folder: folding.folderName,
          },
        };
      });
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async findAll(): Promise<Folding[]> {
    return this.foldingsRepository.find();
  }

  async findParachuteAll(parachuteId: number): Promise<any> {
    try {
      return {
        success: true,
        message: await this.foldingsRepository.findBy({
          parachute: await this.parachutesRepository.findOneBy({
            id: parachuteId,
          }),
        }),
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  findOne(id: number): Promise<Folding> {
    return this.foldingsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.foldingsRepository.delete(id);
  }
}

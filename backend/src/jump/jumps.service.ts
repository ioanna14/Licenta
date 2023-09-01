import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJumpDto } from './dto/create-jump.dto';
import { Jump } from './jump.entity';
import { User } from '../user/user.entity';

@Injectable()
export class JumpsService {
  constructor(
    @InjectRepository(Jump)
    private readonly jumpsRepository: Repository<Jump>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createJumpDto: CreateJumpDto): Promise<any> {
    const jump = new Jump();
    jump.altitude = createJumpDto.altitude;
    jump.exercise = createJumpDto.exercise;
    jump.date = createJumpDto.date;
    jump.plane = createJumpDto.plane;
    jump.dropzone = createJumpDto.dropzone;
    jump.user = await this.usersRepository.findOneBy({
      id: createJumpDto.userId,
    });
    try {
      return {
        success: true,
        message: await this.jumpsRepository.save(jump).then((jump) => {
          return jump.id;
        }),
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  async findAll(userId: number): Promise<any> {
    try {
      return {
        success: true,
        message: await this.jumpsRepository.findBy({
          user: await this.usersRepository.findOneBy({ id: userId }),
        }),
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  findOne(id: number): Promise<Jump> {
    return this.jumpsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.jumpsRepository.delete(id);
  }
}

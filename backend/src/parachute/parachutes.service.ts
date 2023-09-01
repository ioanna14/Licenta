import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParachuteDto } from './dto/create-parachute.dto';
import { Parachute } from './parachute.entity';
import * as Tesseract from 'tesseract.js';
import { User } from '../user/user.entity';
import { ParachuteUser } from './parachute.user.entity';

@Injectable()
export class ParachutesService {
  constructor(
    @InjectRepository(Parachute)
    private readonly parachutesRepository: Repository<Parachute>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ParachuteUser)
    private readonly parachuteUserRepository: Repository<ParachuteUser>,
  ) {}

  async create(createParachuteDto: any) {
    const parachute = new Parachute();
    parachute.type = createParachuteDto.type;
    parachute.isReserve = createParachuteDto.isReserve;
    parachute.series = createParachuteDto.series;

    // console.log(this.performOcr(createParachuteDto.foldings));

    try {
      await this.parachutesRepository
        .save(parachute)
        .then(async (parachute) => {
          await this.parachuteUserRepository.save({
            parachuteId: parachute.id,
            userId: createParachuteDto.userId,
          });
        });
      return {
        success: true,
        message: 'Parachute data added!',
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  // async performOcr(imagePath: string): Promise<string> {
  //   const result = await Tesseract.recognize(
  //     imagePath,
  //     'eng', // Language code for English
  //     {
  //       logger: (info) => console.log(info),
  //     },
  //   );
  //   return result.data.text;
  // }

  async findAll(): Promise<Parachute[]> {
    return this.parachutesRepository.find();
  }

  async findParachutes(userId: number): Promise<any> {
    let mainParachute = null;
    let reserveParachute = null;

    try {
      return await this.parachuteUserRepository
        .findBy({
          userId: userId,
        })
        .then((result) => {
          if (result) {
            result.map(async (element) => {
              await this.parachutesRepository
                .findOneBy({
                  id: element.parachuteId,
                })
                .then((parachute) => {
                  if (parachute) {
                    if (parachute.isReserve) {
                      reserveParachute = parachute;
                    } else {
                      mainParachute = parachute;
                    }
                  }
                });
            });
          }
        })
        .then(() => {
          return {
            success: {
              mainParachute: mainParachute,
              reserveParachute: reserveParachute,
            },
            message: 'User parachutes!',
          };
        });
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  }

  findOne(id: number): Promise<Parachute> {
    return this.parachutesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.parachutesRepository.delete(id);
  }
}

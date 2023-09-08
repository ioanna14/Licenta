import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParachuteDto } from './dto/create-parachute.dto';
import { Parachute } from './parachute.entity';
import * as Tesseract from 'tesseract.js';
import { User } from '../user/user.entity';
import { ParachuteUser } from './parachute.user.entity';
import * as fs from 'fs/promises';
import * as path from 'path';

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

  async performOcr(fileBuffer: ArrayBuffer): Promise<string> {
    try {
      // Convert ArrayBuffer to Uint8Array
      const uint8Array = new Uint8Array(fileBuffer);

      // Write the Uint8Array to a temporary file
      const tempFilePath = path.join(__dirname, 'tempfile.png');
      await fs.writeFile(tempFilePath, uint8Array);

      // Perform OCR using Tesseract.js
      const result = await Tesseract.recognize(tempFilePath, 'eng', {
        logger: (info) => console.log(info),
      });

      // Clean up the temporary file
      await fs.unlink(tempFilePath);

      return result.data.text;
    } catch (error) {
      console.error('Error performing OCR:', error);
      throw error; // Rethrow the error for handling in your controller or service
    }
  }

  async findAll(): Promise<Parachute[]> {
    return this.parachutesRepository.find();
  }

  async findParachutes(userId: number): Promise<any> {
    try {
      let mainParachute = null;
      let reserveParachute = null;
      return {
        success: true,
        message: await this.parachuteUserRepository
          .findBy({
            userId: userId,
          })
          .then((result) => {
            if (result) {
              result.map(async (element) => {
                console.log('parachute user', element);
                const parachute = await this.parachutesRepository.findOneBy({
                  id: element.parachuteId,
                });
                if (parachute) {
                  if (parachute.isReserve) {
                    console.log('parachute reserve', parachute);
                    reserveParachute = parachute;
                  } else {
                    console.log('parachute main', parachute);
                    mainParachute = parachute;
                  }
                }
              });
            }
          })
          .finally(() => {
            console.log('parachutes', mainParachute, reserveParachute);
            return {
              mainParachute: mainParachute,
              reserveParachute: reserveParachute,
            };
          }),
      };
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

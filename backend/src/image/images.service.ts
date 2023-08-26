import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  // async createImageForEvent(
  //   event: Event,
  //   filename: string,
  //   mimeType: string,
  //   size: number,
  // ): Promise<Image> {
  //   const image = this.imageRepository.create({
  //     filename,
  //     mimeType,
  //     size,
  //     event,
  //   });
  //   return await this.imageRepository.save(image);
  // }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { ImageService } from './images.service';
import { ImageController } from './images.controller';
import { EventsService } from '../event/events.service';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, User])],
  providers: [ImageService, EventsService],
  controllers: [ImageController],
})
export class ImageModule {}

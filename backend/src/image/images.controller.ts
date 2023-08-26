import { ImageService } from './images.service';
import { EventsService } from '../event/events.service';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  NotFoundException,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller()
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly eventService: EventsService,
  ) {}

  @Post('/upload-image')
  async uploadImageForEvent(
    @Body() eventId: number,
    @Body() file: any,
    // @UploadedFile(
    //   new ParseFilePipe({
    //     validators: [
    //       new MaxFileSizeValidator({ maxSize: 10000 }),
    //       new FileTypeValidator({ fileType: 'image/jpeg' }),
    //     ],
    //   }),
    // )
    // file: Express.Multer.File,
  ) {
    // const { originalname, mimetype, size } = file;
    //
    // const event = await this.eventService.findOne(eventId);
    // if (!event) {
    //   throw new NotFoundException('Event not found');
    // }
    //
    // return await this.imageService.createImageForEvent(
    //   event,
    //   originalname,
    //   mimetype,
    //   size,
    // );
  }

  // @Get('/get-image/event')
  // async getImageForEvent(@Body() eventId: number, @Res() res: Response) {
  //   try {
  //     const event = await this.eventService.findOne(eventId);
  //     if (!event || !event.image) {
  //       return {
  //         success: false,
  //         message: 'Image not found for the event',
  //       };
  //     }
  //
  //     const imagePath = path.join(
  //       __dirname,
  //       '..',
  //       'uploads',
  //       event.image.filename,
  //     );
  //     const stream = fs.createReadStream(imagePath);
  //
  //     res.setHeader('Content-Type', event.image.mimeType);
  //     res.setHeader('Content-Length', event.image.size.toString());
  //
  //     stream.on('data', (chunk) => {
  //       res.write(chunk);
  //     });
  //
  //     stream.on('end', () => {
  //       res.end();
  //     });
  //
  //     stream.pipe(res);
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: 'Internal server error',
  //     };
  //   }
  // }
}

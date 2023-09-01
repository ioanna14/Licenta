import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { OcrService } from './ocr.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadImage(@UploadedFile() image: multer.File): Promise<string> {
  //   const imagePath = image.path;
  //   return await this.ocrService.performOcr(imagePath);
  // }
}

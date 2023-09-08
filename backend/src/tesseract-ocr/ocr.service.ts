import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async performOcr(imagePath: string): Promise<string> {
    const result = await Tesseract.recognize(
      imagePath,
      'eng', // Language code for English
      {
        logger: (info) => console.log(info),
      },
    );
    return result.data.text;
  }
}

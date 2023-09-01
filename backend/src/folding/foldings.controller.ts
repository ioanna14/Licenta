import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateFoldingDto } from './dto/create-folding.dto';
import { Folding } from './folding.entity';
import { FoldingsService } from './foldings.service';

@Controller('')
export class FoldingsController {
  constructor(private readonly foldingsService: FoldingsService) {}

  @Post('/add-folding')
  async create(@Body() createFoldingDto: CreateFoldingDto): Promise<Folding> {
    return await this.foldingsService.create(createFoldingDto);
  }

  @Get('/get-foldings/:id')
  async findParachuteAll(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Folding[]> {
    return await this.foldingsService.findParachuteAll(id);
  }
}

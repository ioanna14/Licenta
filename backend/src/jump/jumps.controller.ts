import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { CreateJumpDto } from './dto/create-jump.dto';
import { JumpsService } from './jumps.service';

@Controller()
export class JumpsController {
  constructor(private readonly jumpsService: JumpsService) {}

  @Post('/add-jump')
  async create(@Body() createJumpDto: CreateJumpDto): Promise<any> {
    return await this.jumpsService.create(createJumpDto);
  }

  @Get('/get-jumps/:id')
  async findAll(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.jumpsService.findAll(id);
  }
}

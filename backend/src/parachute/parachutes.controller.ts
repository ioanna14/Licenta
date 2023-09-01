import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateParachuteDto } from './dto/create-parachute.dto';
import { Parachute } from './parachute.entity';
import { ParachutesService } from './parachutes.service';

@Controller('')
export class ParachutesController {
  constructor(private readonly parachutesService: ParachutesService) {}

  @Post('/add-parachute')
  create(@Body() createParachuteDto: CreateParachuteDto) {
    const newDto = createParachuteDto;
    newDto.isReserve = false;
    return this.parachutesService.create(newDto);
  }

  @Post('/add-reserve-parachute')
  createReserve(@Body() createParachuteDto: CreateParachuteDto) {
    const newDto = createParachuteDto;
    newDto.isReserve = true;
    return this.parachutesService.create(newDto);
  }

  @Get('/get-parachutes/:id')
  findAll(@Param('id', ParseIntPipe) id: number): Promise<Parachute[]> {
    return this.parachutesService.findParachutes(id);
  }
}

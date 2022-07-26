import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateParachuteDto} from './dto/create-parachute.dto';
import {Parachute} from './parachute.entity';
import {ParachutesService} from './parachutes.service';

@Controller('parachutes')
export class ParachutesController {
    constructor(private readonly parachutesService: ParachutesService) {
    }

    @Post()
    create(@Body() createParachuteDto: CreateParachuteDto): Promise<Parachute> {
        return this.parachutesService.create(createParachuteDto);
    }

    @Get()
    findAll(): Promise<Parachute[]> {
        return this.parachutesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Parachute> {
        return this.parachutesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.parachutesService.remove(id);
    }
}
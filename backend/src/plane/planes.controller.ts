import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreatePlaneDto} from './dto/create-plane.dto';
import {Plane} from './plane.entity';
import {PlanesService} from './planes.service';

@Controller('planes')
export class PlanesController {
    constructor(private readonly planesService: PlanesService) {
    }

    @Post()
    create(@Body() createPlaneDto: CreatePlaneDto): Promise<Plane> {
        return this.planesService.create(createPlaneDto);
    }

    @Get()
    findAll(): Promise<Plane[]> {
        return this.planesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Plane> {
        return this.planesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.planesService.remove(id);
    }
}
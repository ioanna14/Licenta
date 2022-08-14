import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateDropzoneDto} from './dto/create-dropzone.dto';
import {Dropzone} from './dropzone.entity';
import {DropzonesService} from './dropzones.service';

@Controller('dropzones')
export class DropzonesController {
    constructor(private readonly dropzonesService: DropzonesService) {
    }

    @Post()
    create(@Body() createDropzoneDto: CreateDropzoneDto): Promise<Dropzone> {
        return this.dropzonesService.create(createDropzoneDto);
    }

    @Get()
    findAll(): Promise<Dropzone[]> {
        return this.dropzonesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Dropzone> {
        return this.dropzonesService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.dropzonesService.remove(id);
    }
}
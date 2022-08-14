import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateJumpDto} from './dto/create-jump.dto';
import {Jump} from './jump.entity';
import {JumpsService} from './jumps.service';

@Controller('jumps')
export class JumpsController {
    constructor(private readonly jumpsService: JumpsService) {
    }

    @Post()
    create(@Body() createJumpDto: CreateJumpDto): Promise<Jump> {
        return this.jumpsService.create(createJumpDto);
    }

    @Get()
    findAll(): Promise<Jump[]> {
        return this.jumpsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Jump> {
        return this.jumpsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.jumpsService.remove(id);
    }
}
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    ParseIntPipe,
} from '@nestjs/common';
import {CreateFoldingDto} from './dto/create-folding.dto';
import {Folding} from './folding.entity';
import {FoldingsService} from './foldings.service';

@Controller('foldings')
export class FoldingsController {
    constructor(private readonly foldingsService: FoldingsService) {
    }

    @Post()
    create(@Body() createParachuteDto: CreateFoldingDto): Promise<Folding> {
        return this.foldingsService.create(createParachuteDto);
    }

    @Get()
    findAll(): Promise<Folding[]> {
        return this.foldingsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Folding> {
        return this.foldingsService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.foldingsService.remove(id);
    }
}
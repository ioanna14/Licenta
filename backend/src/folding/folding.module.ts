import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Folding} from './folding.entity';
import {FoldingsController} from './foldings.controller';
import {FoldingsService} from './foldings.service';

@Module({
    imports: [TypeOrmModule.forFeature([Folding])],
    providers: [FoldingsService],
    controllers: [FoldingsController],
})
export class FoldingModule {
}
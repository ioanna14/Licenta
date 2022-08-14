import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Jump} from './jump.entity';
import {JumpsController} from './jumps.controller';
import {JumpsService} from './jumps.service';

@Module({
    imports: [TypeOrmModule.forFeature([Jump])],
    providers: [JumpsService],
    controllers: [JumpsController],
})
export class JumpModule {
}
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Parachute} from './parachute.entity';
import {ParachutesController} from './parachutes.controller';
import {ParachutesService} from './parachutes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Parachute])],
    providers: [ParachutesService],
    controllers: [ParachutesController],
})
export class ParachuteModule {
}
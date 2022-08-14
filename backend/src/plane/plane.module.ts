import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Plane} from './plane.entity';
import {PlanesController} from './planes.controller';
import {PlanesService} from './planes.service';

@Module({
    imports: [TypeOrmModule.forFeature([Plane])],
    providers: [PlanesService],
    controllers: [PlanesController],
})
export class PlaneModule {
}
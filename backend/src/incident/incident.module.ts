import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Incident} from './incident.entity';
import {IncidentsController} from './incidents.controller';
import {IncidentsService} from './incidents.service';

@Module({
    imports: [TypeOrmModule.forFeature([Incident])],
    providers: [IncidentsService],
    controllers: [IncidentsController],
})
export class IncidentModule {
}
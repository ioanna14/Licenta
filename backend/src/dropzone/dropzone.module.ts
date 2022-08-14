import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Dropzone} from './dropzone.entity';
import {DropzonesController} from './dropzones.controller';
import {DropzonesService} from './dropzones.service';

@Module({
    imports: [TypeOrmModule.forFeature([Dropzone])],
    providers: [DropzonesService],
    controllers: [DropzonesController],
})
export class DropzoneModule {
}
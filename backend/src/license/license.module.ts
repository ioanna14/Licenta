import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {License} from './license.entity';
import {LicensesController} from './licenses.controller';
import {LicensesService} from './licenses.service';

@Module({
    imports: [TypeOrmModule.forFeature([License])],
    providers: [LicensesService],
    controllers: [LicensesController],
})
export class LicenseModule {
}
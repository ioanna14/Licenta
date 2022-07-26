import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from "./user/user.module";
import {EmergencyContactModule} from "./emergencyContact/emergencyContact.module";
import {LicenseModule} from "./license/license.module";
import {IncidentModule} from "./incident/incident.module";
import {ParachuteModule} from "./parachute/parachute.module";
import {FoldingModule} from "./folding/folding.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'solarecosystems.go.ro',
            port: 5432,
            username: 'ioana',
            password: 'marcar14',
            database: 'skydive',
            // entities: [],
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsersModule,
        EmergencyContactModule,
        LicenseModule,
        IncidentModule,
        ParachuteModule,
        FoldingModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

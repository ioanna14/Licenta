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
import {JumpModule} from "./jump/jump.module";
import {PlaneModule} from "./plane/plane.module";
import {DropzoneModule} from "./dropzone/dropzone.module";
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'ioana',
            password: 'marcar14',
            database: 'licenta',
            // entities: [],
            autoLoadEntities: true,
            synchronize: true,
        }),
        UsersModule,
        EmergencyContactModule,
        LicenseModule,
        IncidentModule,
        ParachuteModule,
        FoldingModule,
        JumpModule,
        PlaneModule,
        DropzoneModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

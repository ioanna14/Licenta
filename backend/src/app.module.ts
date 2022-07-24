import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from "./user/user.module";
import {EmergencyContactModule} from "./emergencyContact/emergencyContact.module";
import {LicenseModule} from "./license/license.module";

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
        LicenseModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

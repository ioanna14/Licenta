import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incident } from './incident.entity';
import { IncidentsController } from './incidents.controller';
import { IncidentsService } from './incidents.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Incident, User]), JwtModule],
  providers: [
    IncidentsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [IncidentsController],
  exports: [IncidentsService],
})
export class IncidentModule {}

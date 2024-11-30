import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Logger } from 'winston';
import { ConfigService } from 'aws-sdk';
import { UtilsService } from 'src/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({  
  imports: [
  LoggerModule,
  TypeOrmModule.forFeature([Calendar]),
  UserModule
],
  controllers: [CalendarController],
  providers: [CalendarService, JwtService, UtilsService, ConfigService, Logger],
})
export class CalendarModule {}

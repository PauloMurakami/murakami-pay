import { Module } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from './roles.service';
import { UtilsService } from 'src/utils/utils.service';
import { Logger } from 'winston';
import { LoggerModule } from 'src/logger/logger.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), LoggerModule, TypeOrmModule.forFeature([User])],
  controllers: [RolesController],
  providers: [JwtService, RolesService, UtilsService, Logger],
  exports:[]
})
export class RolesModule {}

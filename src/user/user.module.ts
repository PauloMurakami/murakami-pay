import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RecoveryToken } from './entities/recovery-token.entity';
import { UtilsService } from 'src/utils/utils.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'winston';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([RecoveryToken])
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, UtilsService, ConfigService, Logger],
  exports: [UserService]
})
export class UserModule {}

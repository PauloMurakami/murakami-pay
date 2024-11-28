import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { Role } from './roles/entities/role.entity';
import { ClsModule } from 'nestjs-cls';
import { RecoveryToken } from './user/entities/recovery-token.entity';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Role, RecoveryToken],
        synchronize: true,
        logging: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RolesModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

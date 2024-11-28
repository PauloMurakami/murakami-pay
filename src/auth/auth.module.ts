import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClsModule } from 'nestjs-cls';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { UtilsService } from 'src/utils/utils.service';
import { Logger } from 'winston';
import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    LoggerModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }), // Certifique-se de que ConfigModule está importado
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>('JWT_SING'), // Certifique-se de usar a chave correta
        signOptions: { expiresIn: '1d' },
      }),
    }),
    ClsModule.forRoot(), 
  ],
  providers: [AuthService, AuthGuard, AdminGuard, UtilsService, Logger], 
  controllers: [AuthController],
  exports: [AuthService], 
})
export class AuthModule {}

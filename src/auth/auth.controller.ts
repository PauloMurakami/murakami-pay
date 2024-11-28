import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { requestPasswordResetDto } from './dto/request-password-reset.dto';
import { passwordResetDto } from './dto/password-reset.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: loginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

}


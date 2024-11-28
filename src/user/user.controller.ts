import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, LoggerService } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @Post()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log("Chamando " + UserController.name + "rota POST - user ")
    return this.userService.createUser(createUserDto);
  }


  @ApiBearerAuth('JWT-auth')
  @Get()
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  findAll() {
    this.logger.log("Chamando " + UserController.name + "rota GET - user ")
    return this.userService.findAllUser();
  }
}

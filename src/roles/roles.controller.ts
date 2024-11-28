import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Inject, LoggerService } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesService } from './roles.service';
import { AdminGuard } from 'src/auth/admin.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('Role')
@Controller('role')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) {}
  @ApiBearerAuth('JWT-auth')
  @Get()
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  findAll() {
    this.logger.log("Chamando " + RolesController.name + "rota GET - role ")
    return this.rolesService.findAllRoles();
  }
}

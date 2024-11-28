import { Inject, Injectable, LoggerService } from "@nestjs/common";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly rolesRepository: Repository<Role>,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,

  ) { }

  findAllRoles(): Promise<Role[]> {
    this.logger.log("Chamando " + RolesService.name + " metodo findAllRoles")
    return this.rolesRepository.find();
  }
}
import { ConflictException, ForbiddenException, HttpStatus, Inject, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';
import { ClsService } from 'nestjs-cls';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from 'src/user/user.service';
import { CalendarVisibilityEnum, StatusEnum } from 'src/enum/calendar.enum';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private calendarRepository: Repository<Calendar>,
    private readonly userService: UserService,
    private readonly cls: ClsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) { }

  async create(createCalendarDto: CreateCalendarDto): Promise<Calendar> {
    this.logger.log("Chamando " + CalendarService.name + " metodo create");
    const userId = await this.cls.get('id_user');
    const calendar = this.calendarRepository.create(createCalendarDto);
    this.logger.log(CalendarService.name + " calendar criada com sucesso : " + calendar.type);
    calendar.user = await this.userService.findOneUserById(userId);
    const returnCalendar: Calendar = await this.calendarRepository.save(calendar)
    delete returnCalendar.user;
    return returnCalendar;
  }

  async findAll(): Promise<Calendar[]> {
    this.logger.log("Chamando " + CalendarService.name + " metodo findAll");
    const roles = await this.cls.get('roles');
    const roleDescriptions = roles.map(role => role.description);
    const isAdmin = roleDescriptions.includes('administrador');
    if (isAdmin) {
      return this.calendarRepository.find({
        where: { deleted_at: null },
        order: {
          created_at: 'DESC'
        }
      });
    }
    return this.calendarRepository.find({
      where: {
        visibility: CalendarVisibilityEnum.TODOS,
        deleted_at: null
      },
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findAllByDate(): Promise<Calendar[]> {
    this.logger.log("Chamando " + CalendarService.name + " método findAll");
    const roles = await this.cls.get('roles');
    const roleDescriptions = roles.map(role => role.description);
    const isAdmin = roleDescriptions.includes('administrador');

    const today = new Date();
    const tomorrow = new Date(today);
    today.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (isAdmin) {
      return this.calendarRepository.find({
        where: {
          expirated_at: Between(today, tomorrow),
          status: StatusEnum.ABERTO,
          deleted_at: null
        },
        order: {
          created_at: 'DESC'
        }
      });
    }

    return this.calendarRepository.find({
      where: {
        visibility: CalendarVisibilityEnum.TODOS,
        status: StatusEnum.ABERTO,
        expirated_at: Between(today, tomorrow),
        deleted_at: null
      },
      order: {
        created_at: 'DESC'
      }
    });
  }

  async findOne(id: number): Promise<Calendar> {
    this.logger.log("Chamando " + CalendarService.name + " metodo findOne - id : " + id);
    const calendar = await this.calendarRepository.findOne({ where: { id, deleted_at: null } });
    if (!calendar) {
      this.logger.error(CalendarService.name + " calendar not found");
      throw new NotFoundException(`Calendar with ID ${id} not found`);
    }
    return calendar;
  }

  async update(id: number, updateCalendarDto: UpdateCalendarDto): Promise<Calendar> {
    this.logger.log("Chamando " + CalendarService.name + " metodo update - id : " + id);
    const calendar = await this.findOne(id);
    Object.assign(calendar, updateCalendarDto);
    return this.calendarRepository.save(calendar);
  }

  async remove(id: number): Promise<void> {
    this.logger.log("Chamando " + CalendarService.name + " metodo remove - id : " + id);
    const calendar = await this.findOne(id);
    calendar.deleted_at = new Date();
    await this.calendarRepository.save(calendar);
  }

  async findCalendarsByUser(userId?: number): Promise<Calendar[]> {
    this.logger.log("Chamando " + CalendarService.name + " metodo findCalendarsByUser - id: " + userId);
    if (!userId) {
      userId = await this.cls.get('id_user');
      this.logger.log(CalendarService.name + " pegando usuario logado - id: " + userId);
    }
    return this.calendarRepository.find({
      where: {
        user: { id: userId },
        deleted_at: null
      },
      relations: ['user'],
      order: {
        created_at: 'DESC'
      }
    });
  }

  async markAsCompleted(id: number): Promise<Calendar> {
    this.logger.log("Chamando " + CalendarService.name + " metodo markAsCompleted - id : " + id);
    const calendar = await this.findOne(id);
    if (!calendar) {
      this.logger.error(CalendarService.name + " calendar not found");
      throw new NotFoundException(`Calendar with ID ${id} not found`);
    }
    calendar.status = StatusEnum.CONCLUIDO; // Assuming 'CONCLUIDO' is a valid status in StatusEnum
    return this.calendarRepository.save(calendar);
  }
}
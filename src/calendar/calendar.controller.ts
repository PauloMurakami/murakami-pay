import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Calendar')
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.create(createCalendarDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.calendarService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('today')
  findAllByToday() {
    return this.calendarService.findAllByDate();
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calendarService.findOne(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalendarDto: UpdateCalendarDto) {
    return this.calendarService.update(+id, updateCalendarDto);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Patch('concluido/:id')
  markAsCompleted(@Param('id') id: string) {
    return this.calendarService.markAsCompleted(+id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calendarService.remove(+id);
  }
}

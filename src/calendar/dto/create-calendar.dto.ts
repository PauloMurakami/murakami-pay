import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsDateString, IsString } from 'class-validator';
import { CalendarEnum, CalendarVisibilityEnum, StatusEnum } from 'src/enum/calendar.enum';

export class CreateCalendarDto {
    @ApiProperty({ enum: CalendarEnum })
    @IsNotEmpty()
    @IsEnum(CalendarEnum)
    type: CalendarEnum;

    @ApiProperty({ enum: StatusEnum })
    @IsNotEmpty()
    @IsEnum(StatusEnum)
    status: StatusEnum;

    @ApiProperty({ enum: CalendarVisibilityEnum })
    @IsNotEmpty()
    @IsEnum(CalendarVisibilityEnum)
    visibility: CalendarVisibilityEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    expirated_at: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: String;

}
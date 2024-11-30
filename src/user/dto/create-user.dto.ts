import {
    IsAlphanumeric,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/entities/role.entity';
import { Type } from 'class-transformer';
export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric("pt-BR", {
        message: 'Username does not allow other than alpha numeric chars.',
    })
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: [Role], description: 'Roles assigned to the user' })
    @IsArray()
    @ValidateNested({ each: true }) // Validates each object in the array
    @Type(() => Role) // Transforms plain objects to instances of the Role class
    roles: Role[];
}
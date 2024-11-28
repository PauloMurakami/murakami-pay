import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MinLength } from "class-validator";

export class loginDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3, { message: 'email must have atleast 3 characters.' })
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
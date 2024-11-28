import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty, IsString, MinLength } from "class-validator";

export class requestPasswordResetDto {

    @ApiProperty()
    @IsNotEmpty()
    email: string;
}
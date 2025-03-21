import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class passwordResetDto {

    @ApiProperty()
    @IsNotEmpty()
    token: string;

    @ApiProperty()
    @IsNotEmpty()
    newPassword: string;
}
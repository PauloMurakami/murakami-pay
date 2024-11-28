import { Module } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { UtilsService } from './utils.service';

@Module({
    providers: [UtilsService, ClsService],
    exports: [UtilsService],
    imports:[]

})
export class UtilsModule { }
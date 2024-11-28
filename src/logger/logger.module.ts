import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment-timezone';
const timestampFormat = () => moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

@Module({
    imports: [
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp({ format: timestampFormat }),
                        winston.format.simple(),
                    ),
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                    format: winston.format.combine(
                        winston.format.timestamp({ format: timestampFormat }),
                        winston.format.json()
                    ),
                })
            ],
        }),
    ],
    exports: [WinstonModule], 
})
export class LoggerModule { }

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';
import { JwtSing } from 'src/auth/auth.service';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class UtilsService {
    constructor(
        private readonly cls: ClsService,
        private jwtService: JwtService
    ) { }

    async getAuthorization(): Promise<any> {
        return this.cls.get('authorization');
    }

    async getIdUserWithToken(): Promise<number> {
        let objetoToken = await this.decodeTokenAndGetObject(await this.getAuthorization())

        return objetoToken.sub;
    }

    async decodeTokenAndGetObject(authorization: string): Promise<JwtSing> {
        return await this.jwtService.decode(authorization)
    }

    hasRole(roles: any, roleDescription: string): boolean {
        return roles.some(role => role.description === roleDescription);
    }

    generateNumericToken(length: number = 6): string {
        let token = '';
        for (let i = 0; i < length; i++) {
            token += Math.floor(Math.random() * 10);
        }
        return token;
    }
    gerarCsv(dados: any[], colunas: { id: string; title: string }[]): string {
        const csvStringifier = createObjectCsvStringifier({
            header: colunas,
        });
        const header = csvStringifier.getHeaderString();
        const records = csvStringifier.stringifyRecords(dados);
        return header + records;
    }
}
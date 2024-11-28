import { Inject, Injectable, LoggerService, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
export interface JwtSing {
    sub: number,
    username: string
}
@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) { }
    async signIn(email: string, pass: string): Promise<any> {
        this.logger.log("Chamando " + AuthService.name + " metodo signIn")
        const user = await this.usersService.findOneUserByEmail(email);
        if (user?.password !== pass) {
            this.logger.error(AuthService.name + " Senha incorreta para o email: "+ email)
            throw new UnauthorizedException();
        }
        delete user.password;
        delete user.created_at;
        const payload = { sub: user.id, email: user.email, roles: user.roles };
        
        this.logger.log(AuthService.name + " Usuario logado com sucesso! email: "+ email)
        return {
            access_token: await this.jwtService.signAsync(payload),
            ...user
        };
    }
    async requestPasswordReset(email: string): Promise<void> {
        this.logger.log("Chamando " + AuthService.name + " metodo requestPasswordReset")
        this.logger.log(AuthService.name + "metodo requestPasswordReset, email: " + email)
        await this.usersService.requestPasswordReset(email);
    }
    async resetPassword(token: string, newPassword: string) {
        this.logger.log("Chamando " + AuthService.name + " metodo resetPassword")
        await this.usersService.resetPassword(token, newPassword)
    }
    async decodeTokenAndGetObject(authorization: string): Promise<JwtSing> {
        this.logger.log("Chamando " + AuthService.name + " metodo decodeTokenAndGetObject")
        return await this.jwtService.decode(this.extractToken(authorization))
    }
    private extractToken(authorization: string): string {
        this.logger.log("Chamando " + AuthService.name + " metodo extractToken")
        const [type, token] = authorization.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
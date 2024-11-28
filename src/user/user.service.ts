import { Inject, Injectable, LoggerService, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RecoveryToken } from './entities/recovery-token.entity';
import * as nodemailer from 'nodemailer';
import { UtilsService } from 'src/utils/utils.service';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(RecoveryToken) private readonly recoveryTokenRepository: Repository<RecoveryToken>,
    private readonly utilsService: UtilsService,
    private readonly configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
  ) { }

  async requestPasswordReset(email: string): Promise<void> {
    this.logger.log("Chamando " + UserService.name + " metodo requestPasswordReset")
    this.logger.log(UserService.name + " email: " + email)

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      this.logger.error(UserService.name + " usuario não encontrado para o email: " + email)
      return;
    }

    const token = this.utilsService.generateNumericToken();
    this.logger.log(UserService.name + " gerando o token para o email: " + email)
    const recoveryToken = this.recoveryTokenRepository.create({
      token,
      user,
    });

    await this.recoveryTokenRepository.save(recoveryToken);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      secure: true,
      port: 465,
    });

    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Recuperação de senha',
      text: `Token para recuperação de senha: ${token}`,
    };
    this.logger.log(UserService.name + " enviando o email para o email: " + email)

    await transporter.sendMail(mailOptions);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    this.logger.log("Chamando " + UserService.name + " metodo resetPassword")
    const recoveryToken = await this.recoveryTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!recoveryToken) {
      this.logger.error(UserService.name + " Token Invalido ou expirado!")
      throw new Error('Invalid or expired token');
    }

    const user = recoveryToken.user;
    user.password = newPassword;

    await this.userRepository.save(user);
    await this.recoveryTokenRepository.remove(recoveryToken);
    this.logger.log(UserService.name + " reset de senha concluido!")

  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log("Chamando " + UserService.name + " metodo createUser")
    const user: User = new User();
    if (await this.findOneUserByUsername(createUserDto.username)) {
      throw new UnauthorizedException();
    }
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.roles = createUserDto.roles
    await this.userRepository.save(user);
    delete user.password
    this.logger.log(UserService.name + " usuario criado com sucesso! email: " + user.email)
    return user;
  }

  findAllUser(): Promise<User[]> {
    this.logger.log("Chamando " + UserService.name + " metodo findAllUser")
    return this.userRepository.find({
      order: {
          created_at: 'DESC'
      }});
  }

  viewUser(id: number): Promise<User> {
    this.logger.log("Chamando " + UserService.name + " metodo viewUser id: " + id)
    return this.userRepository.findOneBy({ id });
  }

  findOneUserByUsername(username: string): Promise<User> {
    this.logger.log("Chamando " + UserService.name + " metodo findOneUserByUsername: " + username)
    return this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });;
  }

  findOneUserByEmail(email: string): Promise<User> {
    this.logger.log("Chamando " + UserService.name + " metodo findOneUserByEmail: " + email)
    return this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });;
  }

  findOneUserById(id: number): Promise<User> {
    this.logger.log("Chamando " + UserService.name + " metodo findOneUserById id: " + id)
    return this.userRepository.findOneBy({ id });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log("Chamando " + UserService.name + " metodo updateUser id: " + id)
    const user: User = new User();
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    this.logger.log(UserService.name + " usuario atualizado com sucesso! email: " + user.email)
    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    this.logger.log("Chamando " + UserService.name + " metodo removeUser id: " + id)
    return this.userRepository.delete(id);
  }
}
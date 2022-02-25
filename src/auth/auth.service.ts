import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository, private jwtService: JwtService) { }

  async signUp(dto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(dto);
  }

  async signIn(dto: AuthCredentialsDto): Promise<{ access_token: string; }> {
    const { username, password } = dto;

    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const access_token: string = this.jwtService.sign(payload);
      return { access_token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}

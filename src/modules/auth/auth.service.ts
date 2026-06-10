import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDto, VerifyDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<JwtTokenDto> {
    const user = await this.userService.findOneByEmail(email);
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload: VerifyDto = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role,
      status: user.status,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

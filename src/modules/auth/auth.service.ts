import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Sai mật khẩu');
    }

    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
      email: user.email,
    };


    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}


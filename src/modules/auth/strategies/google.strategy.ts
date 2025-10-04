import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // 1. Kiểm tra user trong DB
    const email = profile.emails[0].value;
    const checkUser = await this.usersService.findByEmail(email);

    // 2. Nếu chưa có thì tạo mới
    let newUser = null;
    if (!checkUser) {
      // Nếu người dùng chưa tồn tại, tạo mới người dùng
      const newUser = await this.usersService.createUserFromGoogle({
        email: profile.emails[0].value,
        username: profile.emails[0].value.split('@')[0],
        fullName: profile.displayName,
        provider: 'google',
        providerId: profile.id,
      });
    }

    // 3. Lấy user cuối cùng (nếu có sẵn thì dùng checkUser, nếu vừa tạo thì dùng newUser)
    const finalUser = checkUser ?? newUser;
    // 4. Tạo JWT riêng của hệ thống
    const payload = {
      sub: finalUser.id,
      email: finalUser.email,
      username: finalUser.username,
      role: finalUser.role,
    };
    const jwtToken = this.jwtService.sign(payload);

    // 5. Chuẩn hóa dữ liệu trả về
    const userInfo = {
      id: finalUser.id,
      email: finalUser.email,
      fullName: finalUser.fullName,
      avatar: finalUser.avatar,
      role: finalUser.role,
      token: jwtToken,
    };

    done(null, userInfo);
  }
}

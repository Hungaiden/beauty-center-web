import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../../common/guards/auth.guards';
import { AuthService } from './auth.service';
import { jwtConstants } from '../../common/guards/constants';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './strategies/google.strategy';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    UsersModule,
    JwtModule.register({
      global: true, //Module này sẽ được dùng toàn cục (toàn bộ app).
      secret: jwtConstants.secret, // Khóa bí mật dùng để ký và xác thực JWT, lấy từ file constants.
      signOptions: { expiresIn: '36000s' }, //Token JWT sẽ hết hạn sau 36,000 giây (~10 tiếng).
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    GoogleStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
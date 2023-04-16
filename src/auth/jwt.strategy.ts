import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class JwtStorage extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    } as StrategyOptions);
  }

  async validate(user: User) {
    // console.log(user);
    const existUser = await this.authService.getUser(user);
    if (!existUser) {
        throw new UnauthorizedException({
          data: {
            isLogin: false,
          },
          errorCode: '401',
          errorMessage: '请先登录！',
          success: true,
        });
    }
    return existUser;
  }
}
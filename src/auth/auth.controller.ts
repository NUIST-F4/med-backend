import { Controller, Post, Body, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

    constructor(private readonly authService : AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login/account')
    async login(@Body() login: LoginDto, @Req() req) {
        const ret = {
            jwt: await this.authService.login(req.user),
            status: 'ok',
            type: login.type,
            currentAuthority: req.user.role,
            ...req.user
        }
        // remove password from response
        // TODO: 偷懒直接删了,应该改成拦截器
        delete ret.password;
        return ret
    }

    // outlogin
    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    async logout(@Req() req) {
        return this.authService.logout(req.user);
    }

    
    @ApiBearerAuth() 
    @UseGuards(AuthGuard('jwt'))
    @Post('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}



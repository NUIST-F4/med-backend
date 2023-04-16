import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorators';
import { noGuards, authedGuards } from 'src/auth/guards/guards.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @noGuards()
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    // console.log('createUser', createUser);
    return this.userService.register(createUser);
  }

  @authedGuards()
  @Get('current')
  //get current user
  async current( @Req() req ) {
    return {
      success: true,
      data: req.user
    };
  }

  @authedGuards()
  @Get('usrinfo')
  getUserInfo(@Req() req) {
    return req.user;
  }

  @authedGuards()
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @authedGuards()
  @Roles('user')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @authedGuards()
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @authedGuards()
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

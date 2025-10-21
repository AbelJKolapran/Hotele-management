import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService, AdminLoginDto, UserLoginDto } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AdminGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/login')
  async loginAdmin(@Body() adminLoginDto: AdminLoginDto) {
    return this.authService.loginAdmin(adminLoginDto);
  }

  @Post('user/login')
  async loginUser(@Body() userLoginDto: UserLoginDto) {
    return this.authService.loginUser(userLoginDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post('admin/create')
  async createAdmin(@Body() createAdminDto: { username: string; password: string; role: string }) {
    return this.authService.createAdmin(
      createAdminDto.username,
      createAdminDto.password,
      createAdminDto.role,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

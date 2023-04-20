import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

}

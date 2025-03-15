import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    const { user } = req;
    const userData = await this.authService.login(user);
    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&email=${userData.email}&accessToken=${userData.accessToken}`,
    );
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
} from '@nestjs/common';
import { DriverSignUpnDto, DriverLoginDto, WatcherSignUpDto, WatcherLoginpDto } from './dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@UseGuards()
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService, 
    ) {}


  @Post('driver_signup')
  async driver_signup(
    @Body() signUpDriverDto: DriverSignUpnDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token,driver } = await this.authService.driverSignUp(signUpDriverDto);
    response.cookie('jwt_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
    });

    return driver
  }


  @Post('driver_login')
  async driver_login(
    @Body() signInDriverDto: DriverLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, driver } = await this.authService.driverLogin(signInDriverDto);

    response.cookie('jwt_token', access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return {
      message: 'Login successful',
      access_token: access_token,
      driver
    };
  }

  
  @Post('watcher_signup')
  async watcher_signup(
    @Body() signUpWatcherDto: WatcherSignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token,watcher } = await this.authService.watcherSignUp(signUpWatcherDto);
    response.cookie('jwt_token', access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60,
    });

    return watcher
  }

  @Post('watcher_login')
  async watcher_login(
    @Body() signInWatcherDto: WatcherLoginpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token, watcher } = await this.authService.watcherLogin(signInWatcherDto);

    response.cookie('jwt_token', access_token, {
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return {
      message: 'Login successful',
      access_token: access_token,
      watcher
    };
  }

  @Post('logout')
  async logout(
    @Body() signInUserDto: DriverLoginDto| WatcherLoginpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('jwt_token');
  }

}

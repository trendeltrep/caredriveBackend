import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DriverSignUpnDto, DriverLoginDto, WatcherSignUpDto, WatcherLoginpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DriverService } from 'src/api/driver/driver.service';
import { WatcherService } from 'src/api/watcher/watcher.service';
import * as EmailValidator from 'email-validator';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private driverService: DriverService,
    private watcherService: WatcherService
  ) {}
  
  async driverSignUp(dto: DriverSignUpnDto) {
    if (await this.driverService.getDriver(dto.email))
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.FORBIDDEN,
      );
    if (!EmailValidator.validate(dto.email) ){
      throw new BadRequestException("Invalid email")
    }
    if (!/^\d{10}$/.test(dto.phone)){
      throw new BadRequestException('Invalid phone number')
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const createdDriver = await this.prisma.driver.create({
      data: {
        driverName:dto.driverName,
        driverSurname:dto.driverSurname,
        city:dto.city,
        email: dto.email,
        phone: dto.phone,
        password:hashedPassword,
      },
    });
    return await this.driverLogin(dto as DriverLoginDto);

  }

  async driverLogin(dto: DriverLoginDto) {
    const driver = await this.driverService.getDriver(dto.email);
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }
    if (driver.driverName !== dto.driverName 
      || driver.phone!== dto.phone
      || driver.driverSurname !== dto.driverSurname){
      throw new UnauthorizedException("Invalid credentials");
    }
    const match = await bcrypt.compare(dto.password, driver.password);
    if (match) {
      const payload = { sub: driver.id, email: driver.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        driver: driver
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }


  async watcherSignUp(dto: WatcherSignUpDto) {
    if (await this.watcherService.getWatcher(dto.email))
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.FORBIDDEN,
      );
    if (!EmailValidator.validate(dto.email) ){
      throw new BadRequestException("Invalid email")
    }
    if (!/^\d{10}$/.test(dto.phone)){
      throw new BadRequestException('Invalid phone number')
    }
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const createdDriver = await this.prisma.watcher.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        password:hashedPassword,
        watcherSurname:dto.watcherSurname,
        watcherName:dto.watcherName,
        role:dto.role
      },
    });
    return await this.watcherLogin(dto as WatcherLoginpDto);

  }

  async watcherLogin(dto: WatcherLoginpDto) {
    const watcher = await this.watcherService.getWatcher(dto.email);
    if (!watcher) {
      throw new NotFoundException('Watcher not found');
    }
    if (watcher.watcherName !== dto.watcherName || watcher.phone!== dto.phone){
      throw new UnauthorizedException("Invalid credentials");
    }
    const match = await bcrypt.compare(dto.password, watcher.password);
    if (match) {
      const payload = { sub: watcher.id, email: watcher.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        watcher: watcher
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  
}

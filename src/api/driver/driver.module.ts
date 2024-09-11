import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [DriverController],
  providers: [DriverService],
  exports:[DriverService],
})
export class DriverModule {}

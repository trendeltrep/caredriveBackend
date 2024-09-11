import { Module } from '@nestjs/common';
import { HeartbeatService } from './heartbeat.service';
import { HeartbeatController } from './heartbeat.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [HeartbeatService],
  controllers:[HeartbeatController],
})
export class HeartbeatModule {}

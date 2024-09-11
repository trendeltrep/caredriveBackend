import { Module } from '@nestjs/common';
import { WatcherController } from './watcher.controller';
import { WatcherService } from './watcher.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule],
  controllers: [WatcherController],
  providers: [WatcherService],
  exports:[WatcherService]
})
export class WatcherModule {}

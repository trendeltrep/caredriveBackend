import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DriverModule } from './api/driver/driver.module';
import { WatcherModule } from './api/watcher/watcher.module';
import { HeartbeatModule } from './api/heartbeat/heartbeat.module';
import { AlertModule } from './api/alert/alert.module';
import { AccidentModule } from './api/accident/accident.module';
import { CarModule } from './api/car/car.module';
import { DatabaseModule } from './api/database/database.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DriverModule,
    WatcherModule,
    HeartbeatModule,
    AlertModule,
    AccidentModule,
    CarModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

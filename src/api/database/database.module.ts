import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [DatabaseController],
  providers: [DatabaseService],
  imports:[JwtModule]
})
export class DatabaseModule {}

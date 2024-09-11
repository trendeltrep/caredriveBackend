import { Module } from '@nestjs/common';
import { AccidentService } from './accident.service';
import { AccidentController } from './accident.controller';

@Module({
  providers: [AccidentService],
  controllers: [AccidentController]
})
export class AccidentModule {}

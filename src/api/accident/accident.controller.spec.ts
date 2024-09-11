import { Test, TestingModule } from '@nestjs/testing';
import { AccidentController } from './accident.controller';

describe('AccidentController', () => {
  let controller: AccidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccidentController],
    }).compile();

    controller = module.get<AccidentController>(AccidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

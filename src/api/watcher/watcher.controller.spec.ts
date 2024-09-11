import { Test, TestingModule } from '@nestjs/testing';
import { WatcherController } from './watcher.controller';

describe('WaiterController', () => {
  let controller: WatcherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatcherController],
    }).compile();

    controller = module.get<WatcherController>(WatcherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

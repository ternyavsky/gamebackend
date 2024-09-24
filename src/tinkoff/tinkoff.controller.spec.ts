import { Test, TestingModule } from '@nestjs/testing';
import { TinkoffController } from './tinkoff.controller';
import { TinkoffService } from './tinkoff.service';

describe('TinkoffController', () => {
  let controller: TinkoffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TinkoffController],
      providers: [TinkoffService],
    }).compile();

    controller = module.get<TinkoffController>(TinkoffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BomitemController } from './bomitem.controller';

describe('BomitemController', () => {
  let controller: BomitemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BomitemController],
    }).compile();

    controller = module.get<BomitemController>(BomitemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

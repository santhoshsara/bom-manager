import { Test, TestingModule } from '@nestjs/testing';
import { BomitemService } from './bomitem.service';

describe('BomitemService', () => {
  let service: BomitemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BomitemService],
    }).compile();

    service = module.get<BomitemService>(BomitemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

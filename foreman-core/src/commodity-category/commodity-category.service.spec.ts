import { Test, TestingModule } from '@nestjs/testing';
import { CommodityCategoryService } from './commodity-category.service';

describe('CommodityCategoryService', () => {
  let service: CommodityCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommodityCategoryService],
    }).compile();

    service = module.get<CommodityCategoryService>(CommodityCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

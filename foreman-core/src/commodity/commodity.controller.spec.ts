import { Test, TestingModule } from '@nestjs/testing';
import { CommodityController } from './commodity.controller';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommodityService } from './commodity.service';
import { CommodityCategoryController } from '../commodity-category/commodity-category.controller';

import { CommodityCategoryService } from '../commodity-category/commodity-category.service';
import { CommodityCategory } from '../entity/commodity_category.entity';
import { CommodityDTO } from '../dto/commodity.dto';
import { Commodity } from '../entity/commodity.entity';
import { readFileSync } from 'fs';
import { AppModule } from '../app.module';

describe('Product Controller', () => {
  let commodityController: CommodityController;
  let categoryController: CommodityCategoryController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [CommodityController, CommodityCategoryController],
      providers: [CommodityService, CommodityCategoryService],
    }).compile();

    commodityController = module.get<CommodityController>(CommodityController);
    categoryController = module.get<CommodityCategoryController>(
      CommodityCategoryController,
    );
  });

  it('should be defined', () => {
    expect(commodityController).toBeDefined();
    expect(categoryController).toBeDefined();
  });

  it('should create test commodity', async () => {
    try {
      const categories: CommodityCategory[] = await categoryController.findAll();
      expect(categories).toBeDefined();
      expect(categories.length).toBeGreaterThan(0);

      const newCommodityDto: CommodityDTO = {
        name: Date.now().toString(),
        description: new Date().toLocaleDateString('en-US'),
        category: categories[0],
      };

      const newCommodity: Commodity = await commodityController.create(
        newCommodityDto,
      );
      expect(newCommodity).toBeDefined();
      expect(newCommodity.id).toBeGreaterThan(0);
    } catch (ex) {
      console.log(ex);
    }
  });

  it('should get commodity by category', async () => {
    const categories: CommodityCategory[] = await categoryController.findAll();
    expect(categories).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
    const commodities: Commodity[] = await commodityController.getProductByTypeId(
      categories[0].id,
    );
    expect(commodities).toBeDefined();
    expect(categories.length).toBeGreaterThan(0);
  });
});

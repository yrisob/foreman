import { Test, TestingModule } from '@nestjs/testing';
import { CommodityCategoryController } from './commodity-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CommodityCategoryService } from './commodity-category.service';
import { CommodityCategory } from '../entity/commodity_category.entity';
import { CommodityCategoryDTO } from '../dto/commodity_category.dto';

describe('CommodityCategory Controller', () => {
  let controller: CommodityCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), AuthModule],
      controllers: [CommodityCategoryController],
      providers: [CommodityCategoryService],
    }).compile();

    controller = module.get<CommodityCategoryController>(
      CommodityCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should be create commodity category', async () => {
    const category1: CommodityCategoryDTO = {
      name: 'Лесопилочные материалы3',
    };

    controller.create(category1).then(
      result => {
        expect(result).not.toBeUndefined();
        expect(result.id).not.toBeNaN();
      },
      error => {
        console.log(error);
      },
    );
  });

  it('should be update', async done => {
    try {
      const categories: CommodityCategory[] = await controller.findAll();
      expect(categories).not.toBeUndefined();
      expect(categories.length).toBeGreaterThan(0);

      const newCategoryName: CommodityCategoryDTO = {
        name: Date.now().toString(),
      };

      const updatedResult = await controller.update(
        categories[0].id,
        newCategoryName,
      );

      expect(updatedResult.name).toEqual(newCategoryName.name);
      done();
    } catch (ex) {
      console.log(ex.message);
      expect(ex).toBeUndefined();
    }
  });
});

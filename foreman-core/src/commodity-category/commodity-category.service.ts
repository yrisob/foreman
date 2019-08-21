import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { CommodityCategory } from '../entity/commodity_category.entity';

@Injectable()
export class CommodityCategoryService extends CrudService(CommodityCategory)
  implements ICrudService {}

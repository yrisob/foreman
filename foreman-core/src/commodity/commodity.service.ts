import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { Commodity } from '../entity/commodity.entity';

@Injectable()
export class CommodityService extends CrudService(Commodity)
  implements ICrudService {
  async findByCategoryId(id: number): Promise<Commodity[]> {
    return this.getRepository()
      .createQueryBuilder()
      .where('categoryId = :id', { id })
      .getMany();
  }
}

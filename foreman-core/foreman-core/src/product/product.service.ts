import { Injectable } from '@nestjs/common';
import { CrudService, ICrudService } from '../crud/crud.service';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService extends CrudService(Product)
  implements ICrudService {}

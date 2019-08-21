import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { ProductService } from './product.service';
import { ProductDTO } from '../dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Product } from '../entity/product.entity';

export class ProductController extends CrudController(
  ProductService,
  'product',
  ProductDTO,
  {
    createGuard: AuthGuard('jwt'),
    updateGuard: AuthGuard('jwt'),
    deleteGuard: AuthGuard('jwt'),
  },
) {
  @Get('bytype/:id')
  async getProductByTypeId(
    @Param('id', new ParseIntPipe()) id,
  ): Promise<Product[]> {
    return [];
  }
}

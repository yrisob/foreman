import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { CommodityService } from './commodity.service';
import { CommodityDTO } from '../dto/commodity.dto';
import { AuthGuard } from '@nestjs/passport';
import { Commodity } from '../entity/commodity.entity';

export class CommodityController extends CrudController(
  CommodityService,
  'product',
  CommodityDTO,
  {
    createGuard: AuthGuard('jwt'),
    updateGuard: AuthGuard('jwt'),
    deleteGuard: AuthGuard('jwt'),
  },
) {
  @Get('bycategory/:id')
  async getProductByTypeId(
    @Param('id', new ParseIntPipe()) id,
  ): Promise<Commodity[]> {
    return (this.getService() as CommodityService).findByCategoryId(id);
  }
}

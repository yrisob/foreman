import { Controller } from '@nestjs/common';
import { CrudController } from '../crud/crud.controller';
import { CommodityCategoryService } from './commodity-category.service';
import { CommodityCategoryDTO } from '../dto/commodity_category.dto';
import { AuthGuard } from '@nestjs/passport';

export class CommodityCategoryController extends CrudController(
  CommodityCategoryService,
  'commodity_category',
  CommodityCategoryDTO,
  {
    createGuard: AuthGuard('jwt'),
    updateGuard: AuthGuard('jwt'),
    deleteGuard: AuthGuard('jwt'),
  },
) {}

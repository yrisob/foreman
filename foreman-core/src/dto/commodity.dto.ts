import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CommodityCategory } from '../entity/commodity_category.entity';

export class CommodityDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined = undefined;

  @IsString()
  description: string | undefined = undefined;

  @ValidateNested()
  category: CommodityCategory = new CommodityCategory();
}

import { IsString } from 'class-validator';

export class CommodityCategoryDTO {
  @IsString()
  name: string | undefined = undefined;
}

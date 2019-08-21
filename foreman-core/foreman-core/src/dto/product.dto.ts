import { IsString, IsNotEmpty } from 'class-validator';

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string | undefined = undefined;

  @IsString()
  description: string | undefined;
}

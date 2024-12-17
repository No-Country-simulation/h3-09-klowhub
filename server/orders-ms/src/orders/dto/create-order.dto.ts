import { ArrayMinSize, IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';

import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  buyerUserId: string

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}

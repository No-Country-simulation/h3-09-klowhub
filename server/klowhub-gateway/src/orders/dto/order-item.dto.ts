import { IsEnum, IsNumber, IsPositive, IsUUID } from 'class-validator';

enum PRODUCT_TYPE {
  COURSE = 'COURSE',
  APP = 'APP'
}

export class OrderItemDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  // @IsNumber()
  // @IsPositive()
  // price: number;

  @IsEnum(PRODUCT_TYPE, {
    message: `Type must be "${Object.values(PRODUCT_TYPE).join(' - ')}"`
  })
  type: PRODUCT_TYPE
}

import { IsInt, IsUUID } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  readonly totalPrice: number;

  @IsUUID()
  readonly userId: string;
}

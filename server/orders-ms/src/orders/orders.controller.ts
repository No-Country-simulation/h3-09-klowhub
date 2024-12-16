import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ChangeOrderStatusDto, PaidOrderDto } from './dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) { }

  @MessagePattern('create-order')
  async create(@Payload() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    const paymentSession = await this.ordersService.createPaymentSession(order)

    return {
      order,
      paymentSession
    }
  }

  @MessagePattern('find-all-orders')
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern('find-one-order')
  findOne(@Payload() id: string) {
    return this.ordersService.findOne(id);
  }

  @MessagePattern('change-order-status')
  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeStatus(changeOrderStatusDto);
  }

  @EventPattern('paid-order')
  async paidOrder(@Payload() data: any) {
    return this.ordersService.paidOrder(data)
  }

}

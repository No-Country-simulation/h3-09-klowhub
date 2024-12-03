import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateOrderDto } from './dto';
import { ORDER_SERVICE } from '../config'

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderClient.send('create-order', createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderClient.send('find-all-orders', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderClient.send('find-one-order', id);
  }
}

import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { CreateOrderDto, StatusDto } from './dto';
import { ORDER_SERVICE } from '../config'
import { firstValueFrom } from 'rxjs';

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
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.orderClient.send('find-one-order', id)
      )

      return order
    } catch (error) {
      throw new RpcException(error)
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return this.orderClient.send('change-order-status', { id, status: statusDto.status })
    } catch (error) {
      throw new RpcException(error)
    }
  }
}

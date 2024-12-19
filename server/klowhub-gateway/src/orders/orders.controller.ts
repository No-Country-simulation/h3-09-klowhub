import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Patch, HttpException } from '@nestjs/common';
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
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(this.orderClient.send('create-order', createOrderDto))
      return order
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  @Post('all')
  findAll(
    @Body('userId', ParseUUIDPipe) userId: string, 
  ) {
    return this.orderClient.send('find-all-orders', userId);
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

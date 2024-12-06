import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClient } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { ChangeOrderStatusDto } from './dto';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('orders-ms');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  create(createOrderDto: CreateOrderDto) {
    const { items } = createOrderDto;

    // 1. verify products id with product ms

    // 2. calculate total amount

    // const totalAmount = Array(10)
    //   .fill(null)
    //   .reduce((orderItem, item) => {
    //     const item = product;
    //     return value * 3 + acc;
    //   }, 0);

    // 3. create order
  }

  findAll() {
    const orders = this.order.findMany();
    return orders;
  }

  async findOne(id: string) {
    const order = await this.order.findUnique({
      where: { id },
    });

    if (!order)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`,
      });

    return order;
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const orderFound = await this.findOne(id);

    if (orderFound.status === status) return orderFound;

    const order = await this.order.update({
      where: { id },
      data: { status },
    });

    return order;
  }
}

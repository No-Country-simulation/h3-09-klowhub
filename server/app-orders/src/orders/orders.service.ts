import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = await this.prismaService.order.create({
      data: createOrderDto,
    });

    return newOrder;
  }
}

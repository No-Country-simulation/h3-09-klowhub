import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';

import { PrismaClient } from '@prisma/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { ChangeOrderStatusDto, PaidOrderDto } from './dto';
import { OrderWithProducts } from './intefaces/order-with-products.interface'

import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('orders-ms');

  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
    @Inject('APP_SERVICE')
    private readonly appClient: ClientProxy,
    @Inject('COURSE_SERVICE')
    private readonly courseClient: ClientProxy
  ) {
    super()
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async create(createOrderDto: CreateOrderDto) {
    const { items, buyerUserId } = createOrderDto;

    const productsTypeApp = items
      .filter(item => item.type === 'APP')
      .map(item => item.productId)

    const productsTypeCourse = items
      .filter(item => item.type === 'COURSE')
      .map(item => item.productId)

    let productsAppFound = []
    let productsCourseFound = []

    try {
      productsAppFound = await firstValueFrom(
        this.appClient.send('validateProducts', productsTypeApp)
      )

      productsCourseFound = await firstValueFrom(
        this.courseClient.send('validateProducts', productsTypeCourse)
      )

    } catch (error) {
      throw new RpcException({
        status: error.status,
        message: error.message
      });
    }


    const products = [...productsAppFound, ...productsCourseFound]

    //* calculate total amount
    const totalAmount = products
      .reduce((acc, { id, price }) => {
        const itemQuantity = items.find(item => item.productId === id).quantity
        const totalPrice = price * itemQuantity
        return acc + totalPrice
      }, 0);

    //* total quantity of items
    const totalItems = items.reduce((acc, orderItem) => {
      return acc + orderItem.quantity
    }, 0)

    //* create order
    const order = await this.order.create({
      data: {
        totalAmount,
        totalItems,
        buyerUserId,
        OrderItem: {
          createMany: {
            data: items.map(orderItem => ({
              price: products.find(product => product.id === orderItem.productId).price,
              quantity: orderItem.quantity,
              productId: orderItem.productId,
              type: orderItem.type
            }))
          }
        },
      },
      include: {
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            productId: true,
            type: true
          }
        }
      }
    })

    return {
      ...order,
      OrderItem: order.OrderItem.map(orderItem => ({
        ...orderItem,
        title: products.find(product => product.id === orderItem.productId).title
      }))
    }
  }

  findAll(userId: string) {
    const orders = this.order.findMany({
      where: { buyerUserId: userId }
    });

    return orders;
  }

  async findOne(id: string) {
    const order = await this.order.findUnique({
      where: { id },
      include: {
        OrderItem: true
      }
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

  async createPaymentSession(order: OrderWithProducts) {
    const paymentSession = await firstValueFrom(
      this.paymentService.send('create-payment-session', {
        orderId: order.id,
        currency: 'usd',
        items: order.OrderItem.map(item => ({
          name: item.title,
          price: item.price,
          quantity: item.quantity
        }))
      })
    )

    return paymentSession
  }

  async paidOrder({ orderId, receiptUrl, stripeChargeId }: PaidOrderDto) {

    await this.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        paid: true,
        paidAt: new Date(),
        stripeChargeId: stripeChargeId,
        receiptUrl
      }
    })

    return { msg: 'Paid Success' }
  }
}
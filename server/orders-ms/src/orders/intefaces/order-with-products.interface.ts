import { OrderStatus } from '@prisma/client'

export interface OrderWithProducts {
  OrderItem: {
    title: any;
    price: number;
    productId: string;
    quantity: number;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updateAt: Date;
  discounts: any
}
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserResponse } from './generated/user';
import { OrderServiceGrpc } from './generated/order.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService implements OnModuleInit {
  private orderService: OrderServiceGrpc;

  constructor(@Inject('ORDER_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.orderService =
      this.client.getService<OrderServiceGrpc>('OrderService');
  }

  async getUser(id: string): Promise<UserResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await lastValueFrom(
      this.orderService.getOrders({ userId: id }),
    );

    return {
      id,
      name: 'John Doe',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      orderIds: result.orderIds,
    };
  }
}

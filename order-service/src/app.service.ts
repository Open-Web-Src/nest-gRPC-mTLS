import { Injectable } from '@nestjs/common';
import { GetOrdersResponse } from './generated/order';

@Injectable()
export class AppService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GetOrders(id: string): GetOrdersResponse {
    return {
      orderIds: ['order-1', 'order-2', 'order-3'],
    };
  }
}

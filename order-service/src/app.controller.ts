import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { GrpcMethod } from '@nestjs/microservices';
import { GetOrdersRequest, GetOrdersResponse } from './generated/order';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('OrderService', 'GetOrders')
  getOrders(data: GetOrdersRequest): GetOrdersResponse {
    return this.appService.GetOrders(data.userId);
  }
}

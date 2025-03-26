import { Observable } from 'rxjs';
import { GetOrdersRequest, GetOrdersResponse } from './order';

export interface OrderServiceGrpc {
  getOrders(data: GetOrdersRequest): Observable<GetOrdersResponse>;
}

import { Controller, Get, Param } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserRequest, UserResponse } from './generated/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: UserRequest): Promise<UserResponse> {
    return this.appService.getUser(data.id);
  }

  // RESTful HTTP endpoint
  @Get('user/:id')
  getUserHttp(@Param('id') id: string): Promise<UserResponse> {
    return this.appService.getUser(id);
  }
}

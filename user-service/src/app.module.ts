import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fs from 'fs';
import { join } from 'path';
import * as grpc from '@grpc/grpc-js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'order-service:50051',
          package: 'order',
          protoPath: join(__dirname, '../proto/order.proto'),
          credentials: grpc.credentials.createSsl(
            fs.readFileSync(join(__dirname, '../certs/ca.crt')), // root CA
            fs.readFileSync(join(__dirname, '../certs/user.key')), // client key
            fs.readFileSync(join(__dirname, '../certs/user.crt')), // client cert
          ),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

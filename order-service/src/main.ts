import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as fs from 'fs';
import { join } from 'path';
import * as grpc from '@grpc/grpc-js'; // ✅ required for createSsl

async function bootstrap() {
  const ca = fs.readFileSync(join(__dirname, '../certs/ca.crt'));
  const cert = fs.readFileSync(join(__dirname, '../certs/order.crt'));
  const key = fs.readFileSync(join(__dirname, '../certs/order.key'));

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50051',
        package: 'order',
        protoPath: join(__dirname, '../proto/order.proto'),
        credentials: grpc.ServerCredentials.createSsl(
          ca,
          [
            {
              cert_chain: cert,
              private_key: key,
            },
          ],
          true, // 👈 require client certificate (mTLS)
        ),
      },
    },
  );

  await app.listen();
  console.log('✅ order-service running with gRPC + mTLS on :50051');
}
bootstrap();

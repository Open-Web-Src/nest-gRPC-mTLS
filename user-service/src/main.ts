import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from 'fs';
import * as grpc from '@grpc/grpc-js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const ca = fs.readFileSync(join(__dirname, '../certs/ca.crt'));
  const cert = fs.readFileSync(join(__dirname, '../certs/user.crt'));
  const key = fs.readFileSync(join(__dirname, '../certs/user.key'));

  // gRPC server for user.proto
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'user',
      protoPath: join(__dirname, '../proto/user.proto'),
      credentials: grpc.ServerCredentials.createSsl(
        ca, // root CA
        [
          {
            cert_chain: cert,
            private_key: key,
          },
        ],
        true, // require client certificate
      ),
    },
  });

  await app.startAllMicroservices(); // 👈 start gRPC
  await app.listen(3000); // 👈 start HTTP
  console.log(
    '🚀 user-service running on http://localhost:3000 and gRPC on :50051',
  );
}
bootstrap();

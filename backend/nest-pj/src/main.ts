import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3000', 'https://ts-training.vercel.app'],
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept,Authorization',
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

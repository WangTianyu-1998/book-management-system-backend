import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 全局pipe校验
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // 跨域
  app.enableCors();
  // 允许浏览器访问静态资源
  app.useStaticAssets(join(__dirname, '../uploads'), { prefix: '/uploads' });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

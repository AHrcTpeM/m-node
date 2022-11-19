import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import * as AWS from 'aws-sdk';
import 'dotenv/config';

import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { HttpExceptionFilter } from './common/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);  // , { cors: true }
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get<number>('port');
  const env = config.get<string>('env');

  app.enableCors();
  app.use(morgan('combined'));  // вывод логов посетителей
  app.useStaticAssets(join(__dirname, '..', '..', 'files'));

  const aws = config.get('aws');
  AWS.config.update({
    "accessKeyId": aws.accessKeyID, 
    "secretAccessKey": aws.secretKey, 
    "region": aws.region 
  })

  if (env !== '' && env !== 'production') {
    const configSwagger = new DocumentBuilder()
      .setTitle('Star Wars')
      .setDescription('The Star Wars API description')
      .setVersion('0.0.1')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalInterceptors(new TransformInterceptor()); // to like { data: users }
  app.useGlobalFilters(new HttpExceptionFilter(config));  // catch err
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, () => {
    Logger.log(`Server is running on ${port} port`);
  });
}
bootstrap();

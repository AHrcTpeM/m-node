import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.interceptor';
import { HttpExceptionFilter } from './common/http-exception.filter';
import * as AWS from 'aws-sdk';
import 'dotenv/config';


async function bootstrap() {
  AWS.config.update({
    "accessKeyId": process.env.AWS_ACCESS_KEY_ID, 
    "secretAccessKey": process.env.AWS_SECRET_KEY, 
    "region": process.env.AWS_REGION 
  })

  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Star Wars')
    .setDescription('The Star Wars API description')
    .setVersion('0.0.1')
    .addTag('people')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(new TransformInterceptor()); // to like { data: users }
  app.useGlobalFilters(new HttpExceptionFilter());  // catch err

  await app.listen(process.env.PORT);
}
bootstrap();

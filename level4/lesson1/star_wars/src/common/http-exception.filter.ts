import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Working HttpExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();
    const env = this.configService.get('env');

    let sendObj: {
      statusCode: number;
      message: string;
      timestamp: string;
      path: string;
      note?: string;
    } = {
      statusCode: status,
      message: env !== '' && env !== 'production'
                ? exception.message
                : 'Something went wrong :(',
      timestamp: new Date().toISOString(),
      path: request.url,
    }
    if (exception.message !== 'Something went wrong :(' && message['message'] !== exception.message) {
      sendObj = {
        ...sendObj,
        note: message['message']  // сообщения бывают разные
      }
    }   

    response.status(status).json(sendObj);
  }
}
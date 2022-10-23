import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('Working HttpExceptionFilter');
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    let sendObj: {
      statusCode: number;
      message: string;
      timestamp: string;
      path: string;
      note?: string;
    } = {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    }
    if (message['message'] !== exception.message) {
      sendObj = {
        ...sendObj,
        note: message['message']
      }
    }   

    response.status(status).json(sendObj);
  }
}
import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  get(): string {
    return 'Above us only the sky and the moon ^_^';
  }
}

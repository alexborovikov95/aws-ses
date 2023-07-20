import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/send-mail')
  sendEmail(
    @Query('receiver') receiver: string,
    @Query('name') name: string,
  ): Promise<any> {
    return this.appService.sendEmail(receiver, name);
  }

  @Get('/test')
  testRequest(@Query('text') text: string): Promise<any> {
    return this.appService.testRequest(text);
  }
}

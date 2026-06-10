import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Version('1')
  @Get('health')
  getHealth(): { message: string } {
    return this.appService.getHealth();
  }
}

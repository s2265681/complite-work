import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  arrs: String[];
  constructor(private readonly appService: AppService) {
    this.arrs = [];
  }

  @Get()
  getHello(): string {
    const str = new String(
      'djfidjviosjfviosjfdiovjsdifovjiosdfjviosfjviosdfvsfdvsdfvsdfvsdfvsdfv',
    );
    for (let i = 0; i < 1000000; i++) {
      this.arrs.push(str);
    }
    return 'hello';
  }
}

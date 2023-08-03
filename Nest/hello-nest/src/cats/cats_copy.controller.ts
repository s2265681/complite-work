import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Param,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
// @Controller({ host: ':account.example.com' })
export class CatsController {
  @Get()
  findAll(@Req() request: Request, @Query() query, @Ip() ip): any {
    console.log(query, ip, 'query...');
    // return 'all cats';
    return Promise.resolve('2222');
  }

  @Get('ab*cd')
  findAll2() {
    return 'This route uses a wildcard';
  }

  @Get('cc')
  @HttpCode(204)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' }; // 动态的返回状态码和路由地址
    }
  }

  @Get('/a/:id')
  findOne(@Param() params): string {
    return `This action returns a #${params.id} cat`;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  @Post('dto')
  async create2(@Body() _createCatDto: CreateCatDto) {
    console.log(_createCatDto);
    return 'This action adds a new cat';
  }
}

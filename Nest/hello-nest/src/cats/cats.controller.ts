import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  Req,
  Request,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ParseIntPipe } from 'src/common/pipe/parse-int.pipe';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/decorator/roles.guard';
import { LoggingInterceptor } from 'src/common/interceptor/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { error } from 'console';
import { TimeoutInterceptor } from 'src/common/interceptor/timeout.interceptor';
import { User } from 'src/common/decorator/user.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(new LoggingInterceptor()) // @UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(TimeoutInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto, @Req() request) {
    this.catsService.create({ ...createCatDto, id: Number(createCatDto.id) });
    request.user = 'admin';
    return this.catsService.findAll()?.length;
  }

  @Get('one')
  async findOne2(@User('firstName') firstName: string) {
    console.log(firstName, 'firstName');
    console.log(`Hello ${firstName}`);
  }

  @Get()
  // @Roles('admin')
  async findAll(): Promise<Cat[]> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: {
    //       data: 'this is a custom message',
    //       code: '100090',
    //     },
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(true);
    //   }, 6000);
    // });
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id) {
    // if (!this.catsService.findOne(id)) throw error('d');
    return this.catsService.findOne(id) || 'no data';
  }
}

import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

// @Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  // 配置
  constructor(private readonly catsService: CatsService) {}

  // static forRoot() {
  //   return {
  //     module: CatsModule,
  //     global: true,
  //   };
  // }
}

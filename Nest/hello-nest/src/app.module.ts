import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
import {
  LoggerMiddleware,
  logger,
} from './common/middleware/logger.middleware';
import { BooksModule } from './books/books.module';

const User = { name: 1 };
@Module({
  imports: [CatsModule, DatabaseModule.forRoot([User]), BooksModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('cats');
  }
}

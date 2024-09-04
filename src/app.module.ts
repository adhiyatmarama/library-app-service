import './module-alias';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { OdersModule } from './orders/orders.module';

@Module({
    imports: [BooksModule, OdersModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { OpenLibraryClientModule } from '../libs/open-library/open-library.module';

@Module({
    imports: [OpenLibraryClientModule],
    controllers: [BooksController],
    providers: [BooksService],
    exports: [BooksService]
})
export class BooksModule {}

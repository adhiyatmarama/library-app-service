import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService, IFindBooksBySubjectQueries } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get('/subjects/:subject')
    findBooksBySubject(@Param('subject') subject: string, @Query() query?: IFindBooksBySubjectQueries) {
        return this.booksService.findBooksBySubject(subject, query);
    }

    @Get('/subjects')
    findSubjects() {
        return this.booksService.findSubjects();
    }
}

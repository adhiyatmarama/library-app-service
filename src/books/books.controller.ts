import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { IFindBooksBySubjectQueries } from './books.resources';

@Controller('books')
export class BooksController {
    private readonly logger = new Logger(BooksController.name);
    constructor(private readonly booksService: BooksService) {}

    @Get('/subjects/:subject')
    async findBooksBySubject(@Param('subject') subject: string, @Query() query?: IFindBooksBySubjectQueries) {
        const route = 'GET /books/subjects/:subject';
        try {
            const books = await this.booksService.findBooksBySubject(subject, query);
            this.logger.log(`Successfully ${route}`, { books });
            return books;
        } catch (error) {
            this.logger.error(`Failed GET ${route}`, error);
            throw error;
        }
    }

    @Get('/subjects')
    findSubjects() {
        const route = 'GET /books/subjects';
        try {
            const subjects = this.booksService.findSubjects();
            this.logger.log(`Successfully ${route}`, subjects);
            return subjects;
        } catch (error) {
            this.logger.error(`Failed GET ${route}`, error);
            throw error;
        }
    }
}

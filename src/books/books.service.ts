import { Injectable } from '@nestjs/common';
import { OpenLibraryClientService } from '../libs/open-library/open-library.service';
import { IBook, IFindBooksBySubjectQueries } from './books.resources';



@Injectable()
export class BooksService {
    readonly subjects = ['programming', 'film', 'architecture', 'biology', 'love', 'cooking'];
    constructor(private readonly openLibraryClientService: OpenLibraryClientService) {}

    async findBooksBySubject(subject: string, q?: IFindBooksBySubjectQueries): Promise<IBook[]> {
        const books = await this.openLibraryClientService.findBooksBySubject(subject, q);

        const mapped = books.map((book) => {
            return {
                key: book.key,
                title: book.title,
                authors: book.authors.map((author) => author.name),
                edition_number: book.edition_count
            };
        });

        return mapped;
    }

    findSubjects(): string[] {
        return this.subjects;
    }
}

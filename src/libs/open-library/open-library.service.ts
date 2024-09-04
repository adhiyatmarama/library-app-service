import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IFindBookByBookKeyResult, IFindBooksBySubjectQueries, IWork } from './open-library.resources';

const DEFAULT_LIMIT = 10;
const DEFAULT_OFFSET = 5;

const DEFAULT_HEADERS = {
    'user-agent': 'library-app-service',
    contact_email: 'adhiyatma.pramayoga@gmail.com'
};

@Injectable()
export class OpenLibraryCLientService {
    private BASE_URL = 'https://openlibrary.org/';

    async findBooksBySubject(subject: string, q?: IFindBooksBySubjectQueries): Promise<IWork[]> {
        const response = await axios.get(`${this.BASE_URL}/subjects/${subject}.json`, {
            params: {
                limit: q?.limit || DEFAULT_LIMIT,
                offset: q?.offset || DEFAULT_OFFSET
            },
            headers: DEFAULT_HEADERS
        });

        return response.data.works;
    }

    async findBookByBookKey(key: string): Promise<IFindBookByBookKeyResult> {
        const response = await axios.get(`${this.BASE_URL}${key}.json`, {
            headers: DEFAULT_HEADERS
        });

        const book = response.data;

        const authorDetailPromises = book.authors.map((author: Record<string, any>) => {
            return axios.get(`${this.BASE_URL}${author.author.key}.json`, {
                headers: DEFAULT_HEADERS
            });
        });

        const authorDetailsResult = await Promise.all(authorDetailPromises);

        return {
            title: book.title,
            authors: authorDetailsResult.map((author) => {
                return author.data.name;
            })
        };
    }
}

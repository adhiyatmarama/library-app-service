import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { OpenLibraryCLientService } from 'src/libs/open-library/open-library.service';
import {
    findAuthorByKeyHttpResponse,
    findBookByBookKeyHttpResponse,
    findBookByBookKeyResult,
    findBooksBySubjectHttpResponse,
    findBooksBySubjectResult
} from '../resources/libs/open-library';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

afterAll(() => {
    jest.clearAllMocks();
});

describe('OpenLibraryClientService', () => {
    let service: OpenLibraryCLientService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OpenLibraryCLientService]
        }).compile();

        service = module.get<OpenLibraryCLientService>(OpenLibraryCLientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findBookBySubject', () => {
        it('should return as expected', async () => {
            mockedAxios.get = jest.fn().mockResolvedValueOnce({
                data: findBooksBySubjectHttpResponse
            });

            const result = await service.findBooksBySubject('photography');
            expect(result).toEqual(findBooksBySubjectResult);
        });
    });

    describe('findBookByBookKey', () => {
        const bookKey = '/works/OL86318W';
        it('should return as expected', async () => {
            mockedAxios.get.mockImplementation((url) => {
                if (url.includes(`${bookKey}.json`)) return Promise.resolve({ data: findBookByBookKeyHttpResponse });
                if (url.includes(`${findBookByBookKeyHttpResponse.authors[0].author.key}.json`))
                    return Promise.resolve({ data: findAuthorByKeyHttpResponse });
            });

            const result = await service.findBookByBookKey(bookKey);
            expect(result).toEqual(findBookByBookKeyResult);
        });
    });
});

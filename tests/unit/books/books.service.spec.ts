import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from 'src/books/books.service';
import { OpenLibraryClientService } from 'src/libs/open-library/open-library.service';
import {
    findBooksBySubjectResult as findBooksBySubjectResultBookService,
    findSubjectsResult
} from '../resources/books';
import { findBooksBySubjectResult as findBooksBySubjectResultOpenLibrary } from '../resources/libs/open-library';

afterAll(() => {
    jest.clearAllMocks();
});

describe('BooksService', () => {
    let service: BooksService;
    let openLibraryClientService: OpenLibraryClientService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksService, OpenLibraryClientService]
        }).compile();

        service = module.get<BooksService>(BooksService);
        openLibraryClientService = module.get<OpenLibraryClientService>(OpenLibraryClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findBooksBySubject', () => {
        it('should return as expected', async () => {
            jest.spyOn(openLibraryClientService, 'findBooksBySubject').mockResolvedValueOnce(
                findBooksBySubjectResultOpenLibrary
            );

            const result = await service.findBooksBySubject('photography');

            expect(result).toEqual(findBooksBySubjectResultBookService);
        });
    });

    describe('findSubjects', () => {
        it('should return as expected', () => {
            const result = service.findSubjects();
            expect(result).toEqual(findSubjectsResult);
        });
    });
});

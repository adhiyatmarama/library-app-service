import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from 'src/books/books.controller';
import { BooksService } from 'src/books/books.service';
import { OpenLibraryClientService } from 'src/libs/open-library/open-library.service';
import { findBooksBySubjectResult, findSubjectsResult } from '../resources/books';

afterAll(() => {
    jest.clearAllMocks();
});

describe('BooksController', () => {
    let controller: BooksController;
    let service: BooksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [BooksService, OpenLibraryClientService]
        }).compile();

        controller = module.get<BooksController>(BooksController);
        service = module.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findBooksBySubject', () => {
        it('should return as expected', async () => {
            jest.spyOn(service, 'findBooksBySubject').mockResolvedValueOnce(findBooksBySubjectResult);

            const result = await controller.findBooksBySubject('photography');
            expect(result).toEqual(findBooksBySubjectResult);
        });
    });

    describe('findSubjects', () => {
        it('should return as expected', async () => {
            const result = controller.findSubjects();
            expect(result).toEqual(findSubjectsResult);
        });
    });
});

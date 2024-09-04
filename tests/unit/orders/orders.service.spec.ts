import { Test, TestingModule } from '@nestjs/testing';
import { OpenLibraryClientService } from 'src/libs/open-library/open-library.service';
import { OrdersService } from 'src/orders/orders.service';
import { findAllOrderResult, mockNewOrder, mockOrder } from '../resources/orders';
import { BadRequestException } from '@nestjs/common';
import { findBookByBookKeyResult } from '../resources/libs/open-library';

afterAll(() => {
    jest.clearAllMocks();
});

describe('OrdersService', () => {
    let service: OrdersService;
    let openLibraryClientService: OpenLibraryClientService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrdersService, OpenLibraryClientService]
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        openLibraryClientService = module.get<OpenLibraryClientService>(OpenLibraryClientService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create new order and return new order', () => {
            const result = service.create(mockNewOrder);

            expect(result).toEqual(mockOrder);
        });

        it(`should throw error 'Book already borrowed on that date' if the book already borrowed`, () => {
            service.create(mockNewOrder);

            try {
                service.create(mockNewOrder);
            } catch (e) {
                expect(e).toEqual(new BadRequestException('Book already borrowed on that date'));
            }
        });
    });

    describe('findAll', () => {
        it('should return list of orders with pagination', async () => {
            service.create(mockNewOrder);
            openLibraryClientService.findBookByBookKey = jest.fn().mockResolvedValueOnce(findBookByBookKeyResult);

            const result = await service.findAll();
            expect(result).toEqual(findAllOrderResult);
        });
    });
});

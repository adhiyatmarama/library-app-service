import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from 'src/orders/orders.controller';
import { OrdersService } from 'src/orders/orders.service';
import { findAllOrderResult, mockNewOrder, mockOrder } from '../resources/orders';
import { OpenLibraryClientService } from 'src/libs/open-library/open-library.service';

afterAll(() => {
    jest.clearAllMocks();
});

describe('OrdersController', () => {
    let controller: OrdersController;
    let service: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [OrdersService, OpenLibraryClientService]
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
        service = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should return new order', () => {
            service.create = jest.fn().mockReturnValueOnce(mockOrder);

            const result = controller.create(mockNewOrder);
            expect(result).toEqual(mockOrder);
        });
    });

    describe('findAll', () => {
        it('should return new order', () => {
            service.findAll = jest.fn().mockReturnValueOnce(findAllOrderResult);

            const result = controller.findAll();
            expect(result).toEqual(findAllOrderResult);
        });
    });
});

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { IFindAllOrdersQueries, IFindAllOrdersResponse, IOrder } from './dto/resources';
import { OpenLibraryClientService } from '../libs/open-library/open-library.service';
import { IFindBookByBookKeyResult } from 'src/libs/open-library/open-library.resources';

@Injectable()
export class OrdersService {
    private readonly orders: IOrder[] = [];

    constructor(private readonly openLibraryClientService: OpenLibraryClientService) {}

    create(createOrderDto: CreateOrderDto): IOrder {
        const isBookNotAvailable = this.orders.find(
            (order) =>
                order.book_key === createOrderDto.book_key &&
                new Date(order.end_borrow_date) >= new Date(createOrderDto.start_borrow_date)
        );

        if (isBookNotAvailable) {
            throw new BadRequestException('Book already borrowed on that date');
        }

        const lastId = this.orders[this.orders.length - 1]?.id || 0;
        const newId = lastId + 1;

        this.orders.push({
            id: newId,
            ...createOrderDto
        });

        return {
            id: newId,
            ...createOrderDto
        };
    }

    async findAll(q?: IFindAllOrdersQueries): Promise<IFindAllOrdersResponse> {
        const limit = parseInt(q?.limit) || 10;
        const offset = parseInt(q?.offset) || 0;

        const limitedOrders = this.orders.slice(offset * limit, offset * limit + limit);

        const bookDetailsPromises = limitedOrders.map((order) => {
            return this.openLibraryClientService.findBookByBookKey(order.book_key);
        });

        const booksResults = (await Promise.allSettled(
            bookDetailsPromises
        )) as PromiseFulfilledResult<IFindBookByBookKeyResult>[];

        return {
            data: limitedOrders.map((order, i) => {
                return {
                    ...order,
                    book: booksResults[i].value
                };
            }),
            count: this.orders.length,
            limit,
            offset
        };
    }
}

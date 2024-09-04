import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { IOrder } from 'src/orders/dto/resources';
import { findBookByBookKeyResult } from './libs/open-library';

export const mockOrder: IOrder = {
    id: 1,
    book_key: '/works/OL86318W',
    customer_name: 'Test',
    customer_phone_number: '+620732170302',
    start_borrow_date: '2024-09-04',
    end_borrow_date: '2024-09-05'
};

export const mockNewOrder: CreateOrderDto = {
    book_key: '/works/OL86318W',
    customer_name: 'Test',
    customer_phone_number: '+620732170302',
    start_borrow_date: '2024-09-04',
    end_borrow_date: '2024-09-05'
};

export const findAllOrderResult = {
    data: [
        {
            ...mockOrder,
            book: findBookByBookKeyResult
        }
    ],
    count: 1,
    limit: 10,
    offset: 0
};

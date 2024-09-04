import { IFindBookByBookKeyResult } from 'src/libs/open-library/open-library.resources';

export interface IOrder {
    id: number;
    book_key: string;
    customer_name: string;
    customer_phone_number: string;
    start_borrow_date: string;
    end_borrow_date: string;
}

export interface IOrderWithBookDetails extends IOrder {
    book: IFindBookByBookKeyResult;
}

export interface IFindAllOrdersQueries {
    limit?: string;
    offset?: string;
}

export interface IFindAllOrdersResponse {
    data: IOrderWithBookDetails[];
    count: number;
    limit: number;
    offset: number;
}

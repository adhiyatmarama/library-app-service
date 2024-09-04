import { IsISO8601, IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    book_key: string;

    @IsString()
    @IsNotEmpty()
    customer_name: string;

    @IsString()
    @IsNotEmpty()
    customer_phone_number: string;

    @IsISO8601()
    @IsNotEmpty()
    start_borrow_date: string;

    @IsISO8601()
    @IsNotEmpty()
    end_borrow_date: string;
}

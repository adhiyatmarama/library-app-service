import { Body, Controller, Get, Post, Query, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IFindAllOrdersQueries } from './dto/resources';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Get()
    findAll(@Query() q?: IFindAllOrdersQueries) {
        return this.ordersService.findAll(q);
    }
}

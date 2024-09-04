import { Body, Controller, Get, Logger, Post, Query, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IFindAllOrdersQueries } from './dto/resources';

@Controller('orders')
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    create(@Body(ValidationPipe) createOrderDto: CreateOrderDto) {
        const route = 'POST /orders';
        try {
            const newOrder = this.ordersService.create(createOrderDto);
            this.logger.log(`Successfully ${route}`, { newOrder });
            return newOrder;
        } catch (error) {
            this.logger.error(`Failed ${route}`, error);
            throw error;
        }
    }

    @Get()
    async findAll(@Query() q?: IFindAllOrdersQueries) {
        const route = 'GET /orders';
        try {
            const orders = await this.ordersService.findAll(q);
            this.logger.log(`Successfully ${route}`, { orders });
            return orders;
        } catch (error) {
            this.logger.error(`Failed ${route}`, error);
            throw error;
        }
    }
}

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OpenLibraryClientModule } from '../libs/open-library/open-library.module';

@Module({
    imports: [OpenLibraryClientModule],
    controllers: [OrdersController],
    providers: [OrdersService]
})
export class OdersModule {}

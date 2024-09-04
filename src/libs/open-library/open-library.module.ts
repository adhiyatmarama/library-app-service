import { Module } from '@nestjs/common';
import { OpenLibraryClientService } from './open-library.service';

@Module({
    providers: [OpenLibraryClientService],
    exports: [OpenLibraryClientService]
})
export class OpenLibraryClientModule {}

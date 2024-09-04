import { Module } from '@nestjs/common';
import { OpenLibraryCLientService } from './open-library.service';

@Module({
    providers: [OpenLibraryCLientService],
    exports: [OpenLibraryCLientService]
})
export class OpenLibraryClientModule {}

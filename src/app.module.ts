import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfig from './database/connection';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    DatabaseConfig,
    FilesModule,
  ],
})
export class AppModule {}

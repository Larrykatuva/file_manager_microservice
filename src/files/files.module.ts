import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '../config/files';
import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [],
})
export class FilesModule {}

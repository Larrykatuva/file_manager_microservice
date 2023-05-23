import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { FileStorage } from '../files/interfaces/files.interface';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      dest:
        this.configService.get<string>('FILE_STORAGE') == FileStorage.LOCAL
          ? this.configService.get<string>('LOCAL_FILE_DEST')
          : undefined,
    };
  }
}

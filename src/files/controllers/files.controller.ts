import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from '../services/files.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { StorageInterceptor } from '../interceptors/storage.interceptor';
import { FilesDto } from '../dtos/files.dto';
import { FileStorageDecorator } from '../decorators/fileStorage.decorator';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { FileStorage } from '../interfaces/files.interface';
import fs from 'fs';

@ApiTags('Files')
@Controller('files')
@UseInterceptors(StorageInterceptor)
export class FilesController {
  constructor(
    private filesService: FilesService,
    private configService: ConfigService,
  ) {}

  @Post('file')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Ensure your file is in allowed format',
    type: FilesDto,
  })
  async uploadFile(
    @FileStorageDecorator() fileStorage: FileStorage,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: FilesDto,
  ): Promise<any> {
    if (await this.filesService.filterFile({ refId: body.refId })) {
      if (fileStorage == FileStorage.LOCAL)
        await fs.unlinkSync(
          `${this.configService.get<string>('LOCAL_FILE_DEST')}/${
            files[0].filename
          }`,
        );
      throw new BadRequestException('File with given reference already exist');
    }
    return await this.filesService.createFileRecord(
      body,
      fileStorage,
      files[0],
    );
  }

  @Get(':refId')
  async getFile(
    @Param('refId') refId: string,
    @Res() res: Response,
  ): Promise<any> {
    const file = await this.filesService.filterFile({ refId: refId });
    if (!file) throw new NotFoundException();
    res.sendFile(file.name, {
      root: this.configService.get<string>('LOCAL_FILE_DEST'),
    });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from '../entities/file.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { FilesDto } from '../dtos/files.dto';
import { FileStorage } from '../interfaces/files.interface';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
  ) {}

  async createFileRecord(
    file: FilesDto,
    fileStorage: FileStorage,
    uploadFile: any,
  ): Promise<File> {
    return await this.fileRepository.save({
      storage: fileStorage,
      name: uploadFile.filename,
      description: file.description,
      size: uploadFile.size.toString(),
      type: file.type,
      refId: file.refId,
      refName: file.refName,
    });
  }

  async filterFile(
    filterOptions: Partial<File>,
    options?: FindOneOptions<File>,
  ): Promise<File> {
    try {
      return await this.fileRepository.findOne({
        where: { ...filterOptions },
        ...options,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

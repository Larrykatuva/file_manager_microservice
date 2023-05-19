import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { FileCategory, FileType } from '../interfaces/files.interface';

export class FilesDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @IsNotEmpty()
  files: any[];

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: FileType })
  @IsNotEmpty()
  type: FileType;

  @ApiProperty({ enum: FileCategory })
  @IsNotEmpty()
  category: FileCategory;

  @ApiProperty()
  @IsNotEmpty()
  refId: string;

  @ApiProperty()
  @IsNotEmpty()
  refName: string;

  @ApiProperty()
  organizer: string;
}

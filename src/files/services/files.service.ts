import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "../entities/file.entity";
import { Repository } from "typeorm";

@Injectable()
export class FilesService {
  constructor(@InjectRepository(File) private fileRepository: Repository<File>) {
  }

  async createFileRecord(): Promise<File> {

  }
}
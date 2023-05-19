import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Organizer } from '../../shared/entities/organizer.entity';
import {
  FileCategory,
  FileStorage,
  FileType,
} from '../interfaces/files.interface';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Organizer, (organizer) => organizer.id)
  organizer: Organizer;

  @Column({ type: 'enum', enum: FileStorage })
  storage: FileStorage;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  size: number;

  @Column({ type: 'enum', enum: FileType, default: FileType.UNKNOWN })
  type: FileType;

  @Column({ type: 'enum', enum: FileCategory, default: FileCategory.UNKNOWN })
  category: FileCategory;

  @Column()
  refId: string;

  @Column()
  refName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

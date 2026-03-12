import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'storage_key', unique: true })
  storageKey!: string;

  @Column({ name: 'original_filename' })
  originalFilename!: string;

  @Column({ name: 'mime_type' })
  mimeType!: string;

  @Column({ name: 'size_bytes', type: 'bigint' })
  sizeBytes!: string;

  @Column()
  checksum!: string;

  @Column({ name: 'encrypted_at_rest', type: 'boolean', default: true })
  encryptedAtRest!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


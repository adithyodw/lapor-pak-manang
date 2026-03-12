import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  slug!: string;

  @Column({ name: 'name_id' })
  nameId!: string;

  @Column({ name: 'name_en' })
  nameEn!: string;

  @Column({ name: 'description_id', type: 'text', nullable: true })
  descriptionId!: string | null;

  @Column({ name: 'description_en', type: 'text', nullable: true })
  descriptionEn!: string | null;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @OneToMany(() => Report, (report) => report.category)
  reports!: Report[];
}


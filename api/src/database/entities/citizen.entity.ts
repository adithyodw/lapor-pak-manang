import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Province, City } from './region.entity';
import { File } from './file.entity';
import { Report } from './report.entity';

@Entity({ name: 'citizens' })
export class Citizen {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column({ unique: true })
  nik!: string;

  @Column()
  phone!: string;

  @Column()
  email!: string;

  @Column({ name: 'province_id' })
  provinceId!: number;

  @Column({ name: 'city_id' })
  cityId!: number;

  @Column({ name: 'ktp_file_id', nullable: true })
  ktpFileId!: string | null;

  @ManyToOne(() => Province)
  @JoinColumn({ name: 'province_id' })
  province!: Province;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'ktp_file_id' })
  ktpFile!: File | null;

  @OneToMany(() => Report, (report) => report.citizen)
  reports!: Report[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


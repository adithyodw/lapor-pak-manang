import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Citizen } from './citizen.entity';
import { Report } from './report.entity';

@Entity({ name: 'regions_provinces' })
export class Province {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column({ name: 'name_id' })
  nameId!: string;

  @Column({ name: 'name_en' })
  nameEn!: string;

  @OneToMany(() => City, (city) => city.province)
  cities!: City[];
}

@Entity({ name: 'regions_cities' })
@Index(['provinceId', 'code'], { unique: true })
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'province_id' })
  provinceId!: number;

  @Column()
  code!: string;

  @Column({ name: 'name_id' })
  nameId!: string;

  @Column({ name: 'name_en' })
  nameEn!: string;

  @ManyToOne(() => Province, (province) => province.cities)
  @JoinColumn({ name: 'province_id' })
  province!: Province;

  @OneToMany(() => Citizen, (citizen) => citizen.city)
  citizens!: Citizen[];

  @OneToMany(() => Report, (report) => report.city)
  reports!: Report[];
}


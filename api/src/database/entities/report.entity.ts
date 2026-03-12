import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Citizen } from './citizen.entity';
import { Category } from './category.entity';
import { Province, City } from './region.entity';
import { ReportEvidence } from './report-evidence.entity';
import { ReportStatusHistory } from './report-status-history.entity';
import { Assignment } from './report-assignment.entity';
import { AiAnalysis } from './ai-analysis.entity';
import { Notification } from './notification.entity';

export type ReportStatus =
  | 'RECEIVED'
  | 'UNDER_REVIEW'
  | 'INVESTIGATION'
  | 'RESOLVED'
  | 'CLOSED';

@Entity({ name: 'reports' })
@Index(['categoryId', 'status', 'provinceId', 'cityId', 'submittedAt'])
@Index(['riskScore', 'status'])
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'public_id', unique: true })
  publicId!: string;

  @Column({ name: 'citizen_id' })
  citizenId!: string;

  @Column({ name: 'category_id' })
  categoryId!: number;

  @Column({ name: 'title', length: 255 })
  title!: string;

  @Column({ name: 'description', type: 'text' })
  description!: string;

  @Column({ name: 'province_id' })
  provinceId!: number;

  @Column({ name: 'city_id' })
  cityId!: number;

  @Column({ type: 'varchar', length: 32 })
  status!: ReportStatus;

  @Column({ name: 'risk_score', type: 'float', nullable: true })
  riskScore!: number | null;

  @Column({ name: 'urgency_score', type: 'float', nullable: true })
  urgencyScore!: number | null;

  @Column({ name: 'credibility_score', type: 'float', nullable: true })
  credibilityScore!: number | null;

  @Column({ name: 'ai_summary', type: 'text', nullable: true })
  aiSummary!: string | null;

  @Column({ name: 'duplicate_of_report_id', nullable: true })
  duplicateOfReportId!: string | null;

  @ManyToOne(() => Report, { nullable: true })
  @JoinColumn({ name: 'duplicate_of_report_id' })
  duplicateOf!: Report | null;

  @ManyToOne(() => Citizen, (citizen) => citizen.reports)
  @JoinColumn({ name: 'citizen_id' })
  citizen!: Citizen;

  @ManyToOne(() => Category, (category) => category.reports)
  @JoinColumn({ name: 'category_id' })
  category!: Category;

  @ManyToOne(() => Province, (province) => province.reports)
  @JoinColumn({ name: 'province_id' })
  province!: Province;

  @ManyToOne(() => City, (city) => city.reports)
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @OneToMany(() => ReportEvidence, (evidence) => evidence.report)
  evidence!: ReportEvidence[];

  @OneToMany(() => ReportStatusHistory, (history) => history.report)
  statusHistory!: ReportStatusHistory[];

  @OneToMany(() => Assignment, (assignment) => assignment.report)
  assignments!: Assignment[];

  @OneToMany(() => AiAnalysis, (analysis) => analysis.report)
  aiAnalyses!: AiAnalysis[];

  @OneToMany(() => Notification, (notification) => notification.report)
  notifications!: Notification[];

  @Column({ name: 'submitted_at', type: 'timestamp' })
  submittedAt!: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}


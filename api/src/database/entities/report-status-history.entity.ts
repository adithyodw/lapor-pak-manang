import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report, ReportStatus } from './report.entity';
import { User } from './user.entity';

@Entity({ name: 'report_status_history' })
export class ReportStatusHistory {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'report_id' })
  reportId!: string;

  @Column({ name: 'previous_status', type: 'varchar', length: 32, nullable: true })
  previousStatus!: ReportStatus | null;

  @Column({ name: 'new_status', type: 'varchar', length: 32 })
  newStatus!: ReportStatus;

  @Column({ name: 'changed_by_user_id', nullable: true })
  changedByUserId!: string | null;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @ManyToOne(() => Report, (report) => report.statusHistory)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'changed_by_user_id' })
  changedBy!: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


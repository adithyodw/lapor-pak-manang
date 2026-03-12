import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './report.entity';
import { User } from './user.entity';

@Entity({ name: 'assignments' })
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'report_id' })
  reportId!: string;

  @Column({ name: 'assignee_user_id' })
  assigneeUserId!: string;

  @Column({ name: 'assigned_by_user_id', nullable: true })
  assignedByUserId!: string | null;

  @ManyToOne(() => Report, (report) => report.assignments)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assignee_user_id' })
  assignee!: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_by_user_id' })
  assignedBy!: User | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


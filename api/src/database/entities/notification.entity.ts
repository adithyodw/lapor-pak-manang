import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './report.entity';

export type NotificationChannel = 'email' | 'whatsapp_text';
export type NotificationStatus = 'PENDING' | 'SENT' | 'FAILED';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'report_id' })
  reportId!: string;

  @Column({ type: 'varchar', length: 32 })
  channel!: NotificationChannel;

  @Column({ type: 'varchar', length: 32 })
  status!: NotificationStatus;

  @Column({ name: 'payload_preview', type: 'text', nullable: true })
  payloadPreview!: string | null;

  @Column({ name: 'sent_at', type: 'timestamp', nullable: true })
  sentAt!: Date | null;

  @Column({ type: 'text', nullable: true })
  error!: string | null;

  @ManyToOne(() => Report, (report) => report.notifications)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './report.entity';
import { File } from './file.entity';

export type EvidenceType = 'PHOTO' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' | 'OTHER';

@Entity({ name: 'report_evidence' })
export class ReportEvidence {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'report_id' })
  reportId!: string;

  @Column({ name: 'file_id' })
  fileId!: string;

  @Column({ name: 'evidence_type', type: 'varchar', length: 32 })
  evidenceType!: EvidenceType;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @ManyToOne(() => Report, (report) => report.evidence)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @ManyToOne(() => File)
  @JoinColumn({ name: 'file_id' })
  file!: File;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


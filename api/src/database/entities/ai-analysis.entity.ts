import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Report } from './report.entity';

@Entity({ name: 'ai_analysis' })
export class AiAnalysis {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'report_id' })
  reportId!: string;

  @Column()
  model!: string;

  @Column({ name: 'classification_raw', type: 'jsonb', nullable: true })
  classificationRaw!: unknown | null;

  @Column({ name: 'scores_raw', type: 'jsonb', nullable: true })
  scoresRaw!: unknown | null;

  @Column({ name: 'embedding_vector', type: 'bytea', nullable: true })
  embeddingVector!: Buffer | null;

  @ManyToOne(() => Report, (report) => report.aiAnalyses)
  @JoinColumn({ name: 'report_id' })
  report!: Report;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}


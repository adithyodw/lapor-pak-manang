import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from './ai.service';
import { AiAnalysis } from '../database/entities/ai-analysis.entity';
import { Report } from '../database/entities/report.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([AiAnalysis, Report])],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}


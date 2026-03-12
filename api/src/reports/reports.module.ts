import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Citizen } from '../database/entities/citizen.entity';
import { Report } from '../database/entities/report.entity';
import { Category } from '../database/entities/category.entity';
import { Assignment } from '../database/entities/report-assignment.entity';
import { ReportStatusHistory } from '../database/entities/report-status-history.entity';
import { AdminReportsController } from './admin-reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Citizen,
      Report,
      Category,
      Assignment,
      ReportStatusHistory,
    ]),
  ],
  controllers: [ReportsController, AdminReportsController],
  providers: [ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}


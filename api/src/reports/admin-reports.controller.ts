import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report, ReportStatus } from '../database/entities/report.entity';
import { Assignment } from '../database/entities/report-assignment.entity';
import { ReportStatusHistory } from '../database/entities/report-status-history.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

interface AdminReportListQuery {
  status?: ReportStatus;
  provinceId?: number;
  cityId?: number;
  categoryId?: number;
}

@Controller('api/v1/admin/reports')
@UseGuards(JwtAuthGuard)
export class AdminReportsController {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
    @InjectRepository(ReportStatusHistory)
    private readonly historyRepo: Repository<ReportStatusHistory>,
  ) {}

  @Get()
  async list(@Query() query: AdminReportListQuery) {
    const qb = this.reportRepo
      .createQueryBuilder('report')
      .leftJoinAndSelect('report.category', 'category')
      .leftJoinAndSelect('report.province', 'province')
      .leftJoinAndSelect('report.city', 'city')
      .orderBy('report.riskScore', 'DESC', 'NULLS LAST')
      .addOrderBy('report.submittedAt', 'DESC');

    if (query.status) {
      qb.andWhere('report.status = :status', { status: query.status });
    }
    if (query.categoryId) {
      qb.andWhere('report.categoryId = :categoryId', {
        categoryId: query.categoryId,
      });
    }
    if (query.provinceId) {
      qb.andWhere('report.provinceId = :provinceId', {
        provinceId: query.provinceId,
      });
    }
    if (query.cityId) {
      qb.andWhere('report.cityId = :cityId', {
        cityId: query.cityId,
      });
    }

    const items = await qb.take(100).getMany();

    return items;
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    const report = await this.reportRepo.findOne({
      where: { id },
      relations: [
        'citizen',
        'category',
        'province',
        'city',
        'evidence',
        'statusHistory',
        'assignments',
      ],
    });
    return report;
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body()
    body: {
      newStatus: ReportStatus;
      note?: string;
    },
  ) {
    const report = await this.reportRepo.findOne({ where: { id } });
    if (!report) {
      return null;
    }

    const previousStatus = report.status;
    report.status = body.newStatus;
    await this.reportRepo.save(report);

    const history = this.historyRepo.create({
      reportId: id,
      previousStatus,
      newStatus: body.newStatus,
      note: body.note ?? null,
    });
    await this.historyRepo.save(history);

    return report;
  }

  @Patch(':id/assign')
  async assign(
    @Param('id') id: string,
    @Body()
    body: {
      assigneeUserId: string;
    },
  ) {
    const assignment = this.assignmentRepo.create({
      reportId: id,
      assigneeUserId: body.assigneeUserId,
    });
    await this.assignmentRepo.save(assignment);
    return assignment;
  }
}


import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../database/entities/report.entity';

@Controller('api/v1')
export class AnalyticsController {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {}

  @Get('public-metrics')
  async getPublicMetrics() {
    const totalReports = await this.reportRepo.count();
    const openCases = await this.reportRepo.count({
      where: { status: 'INVESTIGATION' },
    });
    const underReview = await this.reportRepo.count({
      where: { status: 'UNDER_REVIEW' },
    });
    const closedCases = await this.reportRepo.count({
      where: { status: 'CLOSED' },
    });

    return {
      totalReports,
      underReview,
      openCases,
      closedCases,
    };
  }
}


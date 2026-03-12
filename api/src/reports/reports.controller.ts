import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../database/entities/report.entity';

@Controller('api/v1/reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {}

  @Post()
  async create(@Body() dto: CreateReportDto) {
    return this.reportsService.createReport(dto);
  }

  @Get(':publicId')
  async getByPublicId(@Param('publicId') publicId: string) {
    const report = await this.reportRepo.findOne({
      where: { publicId },
      relations: ['category', 'province', 'city'],
    });
    if (!report) {
      return null;
    }

    return {
      publicId: report.publicId,
      status: report.status,
      category: report.category?.slug,
      title: report.title,
      description: report.description,
      province: report.province?.nameId,
      city: report.city?.nameId,
      submittedAt: report.submittedAt,
    };
  }
}


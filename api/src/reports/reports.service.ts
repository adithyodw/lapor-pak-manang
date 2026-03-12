import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citizen } from '../database/entities/citizen.entity';
import { Report } from '../database/entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { Category } from '../database/entities/category.entity';
import { AiService } from '../ai/ai.service';

function generatePublicId(): string {
  // Simple human-friendly ID: yyyyMMdd + random 6 chars
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LPM-${ymd}-${rand}`;
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Citizen)
    private readonly citizenRepo: Repository<Citizen>,
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly aiService: AiService,
  ) {}

  async createReport(dto: CreateReportDto) {
    const category = await this.categoryRepo.findOneByOrFail({
      id: dto.categoryId,
      isActive: true,
    });

    let citizen = await this.citizenRepo.findOne({
      where: { nik: dto.nik },
    });

    if (!citizen) {
      citizen = this.citizenRepo.create({
        fullName: dto.fullName,
        nik: dto.nik,
        phone: dto.phone,
        email: dto.email,
        provinceId: dto.provinceId,
        cityId: dto.cityId,
        ktpFileId: dto.ktpFileId ?? null,
      });
      citizen = await this.citizenRepo.save(citizen);
    }

    const report = this.reportRepo.create({
      publicId: generatePublicId(),
      citizenId: citizen.id,
      categoryId: category.id,
      title: dto.title,
      description: dto.description,
      provinceId: dto.provinceId,
      cityId: dto.cityId,
      status: 'RECEIVED',
      submittedAt: new Date(),
    });

    const saved = await this.reportRepo.save(report);

    // Fire-and-forget AI analysis; errors are logged inside AiService
    void this.aiService.analyzeReport(saved);

    return {
      id: saved.id,
      publicId: saved.publicId,
      status: saved.status,
      submittedAt: saved.submittedAt,
    };
  }
}


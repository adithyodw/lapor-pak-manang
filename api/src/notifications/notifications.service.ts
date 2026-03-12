import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import nodemailer, { Transporter } from 'nodemailer';
import { Notification } from '../database/entities/notification.entity';
import { Report } from '../database/entities/report.entity';

export interface WhatsAppMessagePayload {
  text: string;
  deeplink: string;
}

@Injectable()
export class NotificationsService {
  private transporter: Transporter | null = null;
  private readonly fromAddress: string;
  private readonly whatsappBase: string;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(Report)
    private readonly reportRepo: Repository<Report>,
  ) {
    const host = this.config.get<string>('SMTP_HOST');
    const port = this.config.get<number>('SMTP_PORT' as any);
    const user = this.config.get<string>('SMTP_USER');
    const pass = this.config.get<string>('SMTP_PASS');

    if (host && port && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }

    this.fromAddress =
      this.config.get<string>('EMAIL_FROM', 'lapor@localhost');
    this.whatsappBase = 'https://wa.me';
  }

  async sendEmailForReport(reportId: string, to: string, subject: string) {
    const report = await this.reportRepo.findOne({
      where: { id: reportId },
      relations: ['category', 'province', 'city'],
    });
    if (!report || !this.transporter) {
      return;
    }

    const html = `
      <p>Laporan baru diterima di sistem LAPOR PAK MANANG.</p>
      <p><strong>ID Laporan:</strong> ${report.publicId}</p>
      <p><strong>Judul:</strong> ${report.title}</p>
      <p><strong>Kategori:</strong> ${report.category?.nameId ?? '-'}</p>
      <p><strong>Lokasi:</strong> ${report.province?.nameId ?? '-'} / ${
        report.city?.nameId ?? '-'
      }</p>
      <p>Status saat ini: ${report.status}</p>
    `;

    const notif = this.notificationRepo.create({
      reportId,
      channel: 'email',
      status: 'PENDING',
      payloadPreview: `${subject} :: ${report.publicId}`,
    });
    const saved = await this.notificationRepo.save(notif);

    try {
      await this.transporter.sendMail({
        from: this.fromAddress,
        to,
        subject,
        html,
      });

      await this.notificationRepo.update(saved.id, {
        status: 'SENT',
        sentAt: new Date(),
      });
    } catch (error) {
      await this.notificationRepo.update(saved.id, {
        status: 'FAILED',
        error: (error as Error).message,
      });
    }
  }

  buildWhatsAppMessage(report: Report): WhatsAppMessagePayload {
    const textLines = [
      `LAPOR PAK MANANG – RINGKASAN KASUS`,
      ``,
      `ID Laporan: ${report.publicId}`,
      `Judul: ${report.title}`,
      `Status: ${report.status}`,
      `Provinsi: ${report.provinceId} | Kota/Kab: ${report.cityId}`,
      ``,
      `Ringkasan singkat (AI, jika tersedia):`,
      report.aiSummary ?? '(belum tersedia)',
    ];

    const text = encodeURIComponent(textLines.join('\n'));

    return {
      text: textLines.join('\n'),
      deeplink: `${this.whatsappBase}/?text=${text}`,
    };
  }
}


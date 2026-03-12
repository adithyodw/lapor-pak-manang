import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../database/entities/notification.entity';
import { Report } from '../database/entities/report.entity';
import { NotificationsService } from './notifications.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Notification, Report])],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}


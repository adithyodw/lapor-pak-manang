import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Citizen } from './entities/citizen.entity';
import { File } from './entities/file.entity';
import { Category } from './entities/category.entity';
import { Province, City } from './entities/region.entity';
import { Report } from './entities/report.entity';
import { ReportEvidence } from './entities/report-evidence.entity';
import { ReportStatusHistory } from './entities/report-status-history.entity';
import { Assignment } from './entities/report-assignment.entity';
import { AiAnalysis } from './entities/ai-analysis.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
        username: config.get<string>('DB_USER', 'postgres'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'lapor_pak_manang'),
        ssl: config.get<string>('DB_SSL', 'false') === 'true',
        entities: [
          User,
          Citizen,
          File,
          Category,
          Province,
          City,
          Report,
          ReportEvidence,
          ReportStatusHistory,
          Assignment,
          AiAnalysis,
          Notification,
        ],
        synchronize: false,
        migrationsRun: false,
      }),
    }),
  ],
})
export class DatabaseModule {}


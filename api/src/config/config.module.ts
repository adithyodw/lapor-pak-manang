import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigController } from './config.controller';
import { Category } from '../database/entities/category.entity';
import { Province, City } from '../database/entities/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Province, City])],
  controllers: [ConfigController],
})
export class AppConfigModule {}


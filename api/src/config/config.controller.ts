import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../database/entities/category.entity';
import { Province, City } from '../database/entities/region.entity';

@Controller('api/v1/config')
export class ConfigController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  @Get('categories')
  async getCategories() {
    const categories = await this.categoryRepo.find({
      where: { isActive: true },
      order: { id: 'ASC' },
    });
    return categories;
  }

  @Get('regions')
  async getRegions() {
    const provinces = await this.provinceRepo.find({ order: { id: 'ASC' } });
    const cities = await this.cityRepo.find({ order: { provinceId: 'ASC', id: 'ASC' } });
    return { provinces, cities };
  }
}


import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateReportDto {
  // Citizen identity
  @IsNotEmpty()
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  nik!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  provinceId!: number;

  @IsNotEmpty()
  cityId!: number;

  @IsOptional()
  @IsUUID()
  ktpFileId?: string;

  // Report content
  @IsNotEmpty()
  categoryId!: number;

  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @Length(30, 8000)
  description!: string;
}


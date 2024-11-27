import { QueueStatusEnum } from '../enums/queue-status.enum';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueueInputDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsOptional()
  body?: Record<string, any>;

  @IsOptional()
  query?: Map<string, string>;

  @IsEnum(QueueStatusEnum)
  @IsOptional()
  status?: QueueStatusEnum = QueueStatusEnum.processing;

  @IsOptional()
  @IsNumber()
  retryCount?: number = 3;
}

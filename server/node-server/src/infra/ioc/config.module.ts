import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigService } from '../config';

@Module({
  imports: [NestConfigModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}

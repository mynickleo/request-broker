import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/infra/ioc';
import { ReadyController } from './controllers/ready.controller';
import { QueueController } from './controllers/queue.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { CoreModule } from 'src/core/core.module';
import { ArchiveController } from './controllers/archive.controller';

@Module({
  imports: [CoreModule, ScheduleModule.forRoot(), ConfigModule],
  providers: [],
  controllers: [ReadyController, QueueController, ArchiveController],
})
export class HttpModule {}

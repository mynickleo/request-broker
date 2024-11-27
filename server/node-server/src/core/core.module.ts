import { Module } from '@nestjs/common';
import { ArchiveService } from './services/archive.service';
import { QueueService } from './services/queue.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArchiveSchema } from 'src/infra/mongo/entities/archive.entity';
import { QueueSchema } from 'src/infra/mongo/entities/queue.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Queue', schema: QueueSchema },
      { name: 'Archive', schema: ArchiveSchema },
    ]),
    HttpModule,
  ],
  providers: [ArchiveService, QueueService],
  controllers: [],
  exports: [ArchiveService, QueueService],
})
export class CoreModule {}

import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQueueDocument } from 'src/shared/interfaces/queue-document.interface';
import { ArchiveService } from './archive.service';
import { lastValueFrom } from 'rxjs';
import { ArchiveStatusEnum } from 'src/shared/enums/archive-status.enum';
import { QueueStatusEnum } from 'src/shared/enums/queue-status.enum';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  constructor(
    @InjectModel('Queue') private readonly queueModel: Model<IQueueDocument>,
    @Inject() private readonly archiveService: ArchiveService,
    private readonly httpService: HttpService,
  ) {}

  public async getAll(page: number, limit: number): Promise<{ data: IQueueDocument[]; total: number }> {
    const skip = (page - 1) * limit;
  
    const [data, total] = await Promise.all([
      this.queueModel.find().skip(skip).limit(limit).exec(),
      this.queueModel.countDocuments(),
    ]);
  
    return { data, total };
  }

  public async addToQueue(payload: Partial<IQueueDocument>) {
    const queueItem = new this.queueModel(payload);
    return queueItem.save();
  }

  public async deleteItemFromQueue(id: string): Promise<void> {
    this.queueModel.deleteOne({ _id: id });
  }

  public async processQueue() {
    const items = await this.queueModel.find();

    let completed = 0;
    let failed = 0;
    for (const item of items) {
      try {
        await this.sendRequest(item);

        await Promise.all([
          this.archiveService.moveToArchive(item, ArchiveStatusEnum.success),
          this.queueModel.deleteOne({ _id: item._id }),
        ]);

        completed++;
      } catch (error) {
        item.retryCount -= 1;
        if (item.retryCount <= 0) {
          await Promise.all([
            this.archiveService.moveToArchive(item, ArchiveStatusEnum.failed),
            this.queueModel.deleteOne({ _id: item._id }),
          ]);
        } else {
          item.status = QueueStatusEnum.retry;
          await item.save();
        }
        failed++;
      }
    }

    this.logger.log('The queue has been processed');
    this.logger.log(`Completed: ${completed}`);
    this.logger.log(`Failed: ${failed}`);
  }

  private async sendRequest(item: IQueueDocument): Promise<void> {
    const response = await lastValueFrom(
      this.httpService.request({
        method: item.method,
        url: item.url,
        data: item.body,
        params: item.query,
      }),
    );

    if (response.status >= 400) {
      throw new Error('Request failed');
    }
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.log('Starting processing queue...');
    await this.processQueue();
  }
}

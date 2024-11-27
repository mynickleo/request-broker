import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchiveStatusEnum } from 'src/shared/enums/archive-status.enum';
import { IArchiveDocument } from 'src/shared/interfaces/archive-document.interface';
import { IQueueDocument } from 'src/shared/interfaces/queue-document.interface';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectModel('Archive')
    private readonly archiveModel: Model<IArchiveDocument>,
  ) {}

  public async getAll(
    page: number,
    limit: number,
  ): Promise<{ data: IArchiveDocument[]; total: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.archiveModel.find().skip(skip).limit(limit).exec(),
      this.archiveModel.countDocuments(),
    ]);

    return { data, total };
  }

  public async moveToArchive(
    item: IQueueDocument,
    status: ArchiveStatusEnum,
  ): Promise<void> {
    const archiveItem = new this.archiveModel({
      url: item.url,
      method: item.method,
      body: item.body,
      query: item.query,
      status,
    });

    await archiveItem.save();
  }

  public async deleteAll(): Promise<void> {
    await this.archiveModel.deleteMany({});
  }
}

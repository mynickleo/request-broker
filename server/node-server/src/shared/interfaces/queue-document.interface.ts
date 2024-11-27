import { Document } from 'mongoose';
import { QueueStatusEnum } from '../enums/queue-status.enum';

export interface IQueueDocument extends Document {
  url: string;
  method: string;
  body?: Record<string, any>;
  query?: Map<string, string>;
  status: QueueStatusEnum;
  retryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

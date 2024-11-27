import { Document } from 'mongoose';
import { ArchiveStatusEnum } from '../enums/archive-status.enum';

export interface IArchiveDocument extends Document {
  url: string;
  method: string;
  body?: Record<string, any>;
  query?: Map<string, string>;
  status: ArchiveStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

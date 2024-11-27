import mongoose from 'mongoose';
import { IQueueDocument } from 'src/shared/interfaces/queue-document.interface';

export const QueueSchema = new mongoose.Schema<IQueueDocument>(
  {
    id: {
      type: String,
      required: false,
    },

    url: {
      type: String,
      required: true,
    },

    method: {
      type: String,
      required: true,
    },

    body: {
      type: mongoose.Schema.Types.Mixed,
      required: false,
    },

    query: {
      type: Map,
      of: String,
      required: false,
    },

    status: {
      type: String,
      required: false,
    },

    retryCount: {
      type: Number,
      required: false,
      default: 3,
      min: 0,
    },
  },
  { timestamps: true },
);

export const QueueModel = mongoose.model<IQueueDocument>('Queue', QueueSchema);

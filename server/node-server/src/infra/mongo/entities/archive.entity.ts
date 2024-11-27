import mongoose from 'mongoose';
import { IArchiveDocument } from 'src/shared/interfaces/archive-document.interface';

export const ArchiveSchema = new mongoose.Schema<IArchiveDocument>(
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
  },
  { timestamps: true },
);

export const ArchiveModel = mongoose.model<IArchiveDocument>(
  'Archive',
  ArchiveSchema,
);

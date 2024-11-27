import { QueueStatusEnum } from "../enums/queue-status.enum";

export interface IQueue {
    id: string,
    url: string;
    method: string;
    body?: Record<string, unknown>;
    query?: Map<string, string>;
    status: QueueStatusEnum;
    retryCount: number;
    createdAt: Date;
    updatedAt: Date;
}
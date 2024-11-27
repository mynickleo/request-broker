import { QueueStatusEnum } from "../shared/enums/queue-status.enum";
import { IQueue } from "../shared/interfaces/queue.interface";

export const dataQueue: IQueue[] = [
    {
        id: 'a77efd91-154b-45ab-9c29-59550ba6f923',
        url: 'http://localhost:3000/api/ready',
        method: 'GET',
        status: QueueStatusEnum.processing,
        retryCount: 3,
        createdAt: new Date('2024-11-26'),
        updatedAt: new Date('2024-11-26')
    },
    {
        id: 'd5514d03-a9bd-40d2-846a-d94337da8be8',
        url: 'https://another-example.com',
        method: 'GET',
        body: undefined,
        query: new Map(),
        status: QueueStatusEnum.retry,
        retryCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'd5514d03-a9bd-40d2-846a-d94337da8be8',
        url: 'https://another-example.com',
        method: 'GET',
        body: undefined,
        query: new Map(),
        status: QueueStatusEnum.retry,
        retryCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: 'd5514d03-a9bd-40d2-846a-d94337da8be8',
        url: 'https://another-example.com',
        method: 'GET',
        body: undefined,
        query: new Map(),
        status: QueueStatusEnum.retry,
        retryCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]
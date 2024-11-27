import { ArchiveStatusEnum } from "../enums/archive-status.enum";

export interface IArchive {
    id: string,
    url: string;
    method: string;
    body?: Record<string, unknown>;
    query?: Map<string, string>;
    status: ArchiveStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}
import { ArchiveStatusEnum } from "../shared/enums/archive-status.enum";
import { IArchive } from "../shared/interfaces/archive.interface";

export const dataArchive: IArchive[] = [
    {
        id: 'a77efd91-154b-45ab-9c29-59550ba6f923',
        url: 'http://localhost:3000/api/ready',
        method: 'GET',
        status: ArchiveStatusEnum.success,
        createdAt: new Date('2024-11-26'),
        updatedAt: new Date('2024-11-26')
    }
]
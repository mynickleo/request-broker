import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ArchiveService } from 'src/core/services/archive.service';
import { PaginationParamsDto } from 'src/shared/input/pagination.params.dto';
import { IArchiveDocument } from 'src/shared/interfaces/archive-document.interface';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Get()
  async getArchive(
    @Query() pagination: PaginationParamsDto,
  ): Promise<{ data: IArchiveDocument[]; total: number }> {
    const pageNumber = Math.max(pagination.page, 1);
    const limitNumber = Math.max(pagination.limit, 3);

    return this.archiveService.getAll(pageNumber, limitNumber);
  }

  @Delete()
  async deleteAll(): Promise<void> {
    await this.archiveService.deleteAll();
  }
}

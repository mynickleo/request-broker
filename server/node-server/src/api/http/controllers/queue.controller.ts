import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QueueService } from 'src/core/services/queue.service';
import { PaginationParamsDto } from 'src/shared/input/pagination.params.dto';
import { QueueInputDto } from 'src/shared/input/queue-input.dto';
import { IQueueDocument } from 'src/shared/interfaces/queue-document.interface';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async addToQueue(@Body() payload: QueueInputDto): Promise<void> {
    await this.queueService.addToQueue(payload);
  }

  @Get()
  async getQueueItems(
    @Query() pagination: PaginationParamsDto,
  ): Promise<{ data: IQueueDocument[]; total: number }> {
    const pageNumber = Math.max(pagination.page, 1);
    const limitNumber = Math.max(pagination.limit, 3);

    return this.queueService.getAll(pageNumber, limitNumber);
  }
}

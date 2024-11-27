import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('ready')
export class ReadyController {
  @Get()
  async ready(@Res() res: Response) {
    res.sendStatus(HttpStatus.OK);
  }
}

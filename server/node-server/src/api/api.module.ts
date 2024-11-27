import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { InfraModule } from 'src/infra/infra.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [HttpModule, InfraModule, SharedModule],
  exports: [HttpModule, InfraModule, SharedModule],
})
export class ApiModule {}

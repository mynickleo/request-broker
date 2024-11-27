import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from './infra/config';
import { ConfigModule } from './infra/ioc';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.dbHost}:${configService.dbPort}/${configService.dbName}`,
      }),
    }),
    HttpModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { ConfigService as NestConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import mongoose from 'mongoose';

import { ConfigService } from './config.service';

const configService = new ConfigService(new NestConfigService());

config();

const mongoUri = `mongodb://${configService.dbHost}:${configService.dbPort}/${configService.dbName}`;

mongoose.set('strictQuery', false);
mongoose.connect(mongoUri);

mongoose.connection.on('connected', () => {
  console.log(`MongoDB connected to ${mongoUri}`);
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
mongoose.connection.close();

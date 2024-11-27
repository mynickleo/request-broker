import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Environment } from 'src/shared/enums/environment.enum';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  private getEnvVariable<T>(key: string, defaultValue?: T): T {
    const value = this.nestConfigService.get<T>(key);
    if (value === undefined && defaultValue === undefined) {
      throw new Error(`Environment variable ${key} is not defined`);
    }
    return value ?? defaultValue;
  }

  get appEnv(): Environment {
    return this.getEnvVariable<Environment>('NODE_ENV');
  }

  get appPort(): number {
    return this.getEnvVariable<number>('PORT');
  }

  get dbUser(): string {
    return this.getEnvVariable<string>('DB_USER');
  }

  get dbHost(): string {
    return this.getEnvVariable<string>('DB_HOST');
  }

  get dbPort(): number {
    return Number(this.getEnvVariable<string>('DB_PORT'));
  }

  get dbName(): string {
    return this.getEnvVariable<string>('DB_NAME');
  }

  get dbPassword(): string {
    return this.getEnvVariable<string>('DB_PASSWORD');
  }
}

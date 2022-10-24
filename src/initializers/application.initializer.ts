import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IApplicationInitializer {
  initialize(
    app: INestApplication,
    configService: ConfigService,
  ): Promise<void>;
}

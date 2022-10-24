import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { IApplicationInitializer } from './application.initializer';

export class SessionInitializer implements IApplicationInitializer {
  initialize(
    app: INestApplication,
    configService: ConfigService,
  ): Promise<void> {
    app.use(
      session({
        secret: configService.get<string>('session.cookie.secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: configService.get<number>('session.cookie.max-age'),
        },
      }),
    );
    return;
  }
}

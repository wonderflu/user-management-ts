import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IApplicationInitializer } from './initializers/application.initializer';
import { DatabaseInitializer } from './initializers/database.initializer';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { SessionInitializer } from './initializers/session.initializer';
import { setupSwagger } from './utils/setup.swagger';

const initializers: IApplicationInitializer[] = [
  new DatabaseInitializer(),
  new SessionInitializer(),
];

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  setupSwagger(app);

  for (const initializer of initializers) {
    await initializer.initialize(app, configService);
  }

  await app.listen(configService.get<string>('app.port'), () => {
    console.log('Listening on port 3000!');
  });
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('User Management System')
    .setDescription('REST API Documentation')
    .setVersion('2.0.0')
    .addTag('Nataha API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v2/docs', app, document);
}

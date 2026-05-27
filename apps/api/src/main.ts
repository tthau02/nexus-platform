import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';

if (!('toJSON' in BigInt.prototype)) {
  (BigInt.prototype as unknown as Record<string, unknown>).toJSON = function () {
    return this.toString();
  };
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const logMsg = `${method} ${originalUrl} ${statusCode} ${duration}ms`;

      if (statusCode >= 500) {
        Logger.error(logMsg, undefined, 'HTTP');
      } else if (statusCode >= 400) {
        Logger.warn(logMsg, 'HTTP');
      } else {
        Logger.log(logMsg, 'HTTP');
      }
    });

    next();
  });

  app.setGlobalPrefix('api/v1', { exclude: ['swagger', 'swagger-json'] });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nexus Platform API')
    .setDescription('The Nexus Platform API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'Nexus Platform API Docs',
    swaggerUrl: '/swagger-json',
  });

  await app.listen(8080);
  logger.log(`Server running on http://localhost:8080/api/v1`);
}
bootstrap();

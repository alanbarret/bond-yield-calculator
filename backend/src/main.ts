import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Application Bootstrap
 * 
 * Configures and starts the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: true,  // Allow all origins in production (or specify Render URLs)
    methods: ['GET', 'POST'],
    credentials: true,
  });

  // Global validation pipe - automatically validates all incoming DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Strip properties not in DTO
      forbidNonWhitelisted: true, // Throw error for unknown properties
      transform: true,        // Auto-transform payloads to DTO instances
    }),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Bond Calculator API running on http://localhost:${port}`);
}

bootstrap();

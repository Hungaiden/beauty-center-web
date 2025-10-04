import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for deployment
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe());
  
  // Railway provides PORT environment variable
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// For Vercel serverless deployment
if (require.main === module) {
  bootstrap();
}

export default bootstrap;


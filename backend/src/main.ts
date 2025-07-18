import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Cable Product BOM Manager')
    .setDescription('API documentation for the Cable BOM Manager backend')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger/OpenAPI yapılandırması
  const config = new DocumentBuilder()
    .setTitle('Fastchat API')
    .setDescription('Fastchat API Swagger Documentation')
    .setVersion('1.0.0')
    .addTag('fastchat')
    .addServer(
      `http://localhost:${process.env.PORT ?? 3000}`,
      'Development Server',
    )
    .addBasicAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(
    `📚 Swagger documentation is available at: http://localhost:${port}/api/docs`,
  );
}
void bootstrap();

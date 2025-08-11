import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // o el dominio del frontend en producción
    credentials: true, // si vas a enviar cookies o headers de autenticación
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

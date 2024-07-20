import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //registers the exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(8000);
}
bootstrap();

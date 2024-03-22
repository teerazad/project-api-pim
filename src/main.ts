import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ArgumentMetadata, BadRequestException, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';

export class ValidationPipe422 extends ValidationPipe {
  public async transform (value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata)
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new UnprocessableEntityException(e.initMessage)
      }
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]]
          
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();

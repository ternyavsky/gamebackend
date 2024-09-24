import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
    initializeTransactionalContext();
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.enableVersioning({
        type: VersioningType.URI,
    });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    const config = new DocumentBuilder()
        .setTitle('gamemoney backend')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(8000);
}
bootstrap();

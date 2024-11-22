import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
// import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap(): Promise<void> {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: { port: 3001 },
  //   },
  // )

  // await app.listen()

  // todo: delete all below
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  const config = new DocumentBuilder()
    // .setTitle('')
    // .setDescription('The cats API description')
    // .setVersion('1.0')
    // .addTag('cats')
    .build()

  const documentFactory: () => OpenAPIObject = () =>
    SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, documentFactory)

  app.enableCors({
    origin: '*',
  })

  await app.listen(3003)
}
bootstrap()

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //Set max file size of body json
  app.use(bodyParser.json({ limit: "5000mb" }));
  app.use(bodyParser.urlencoded({ limit: "5000mb", extended: true }));
  const config = new DocumentBuilder()
    .setTitle("Backend ")
    .setDescription("Api Backend")
    .setVersion("1.0")
    .addTag("Backend")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token"
    )
    .build();
  var options = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });
  await app.listen(3001);
}

bootstrap();

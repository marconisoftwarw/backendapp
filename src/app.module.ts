import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtkey, expiresIn } from "./jwtkey/jwtkey.service";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule as NestScheduleModuleNPM } from "@nestjs/schedule";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ModelloModule } from "./modello/modello.module";
import { AcquistoModule } from "./acquisto/acquisto.module";
import { CimiteroModule } from "./cimitero/cimitero.module";
import { TotemModule } from "./totem/totem.module";
import { DefuntoModule } from "./defunto/defunto.module";
import { TemplateModule } from "./template/template.module";
import { ContattiModule } from "./contatti/contatti.module";
import { join } from "path";
import { TotemhardwareModule } from "./totemhardware/totemhardware.module";
import { MessaggioModule } from "./messaggio/messaggio.module";
@Module({
  imports: [
    ConfigModule.forRoot(),
    NestScheduleModuleNPM.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
     password: "wp54xBC,!?ir",
      database: "backendapp",
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    UserModule,
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
    ModelloModule,
    AcquistoModule,
    CimiteroModule,
    TotemModule,
    DefuntoModule,
    TemplateModule,
    ContattiModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", ""),
    }),
    TotemhardwareModule,
    MessaggioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

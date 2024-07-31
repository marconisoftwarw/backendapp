import { Module } from "@nestjs/common";
import { ModelloService } from "./modello.service";
import { ModelloController } from "./modello.controller";
import { Modello } from "./entities/modello.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Modello]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [ModelloController],
  providers: [ModelloService],
})
export class ModelloModule {}

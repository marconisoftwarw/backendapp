import { Module } from "@nestjs/common";
import { MessaggioService } from "./messaggio.service";
import { MessaggioController } from "./messaggio.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";
import { Messaggio } from "./entities/messaggio.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Messaggio]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [MessaggioController],
  providers: [MessaggioService],
})
export class MessaggioModule {}

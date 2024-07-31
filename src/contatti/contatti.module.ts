import { Module } from "@nestjs/common";
import { ContattiService } from "./contatti.service";
import { ContattiController } from "./contatti.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";
import { Contatti } from "./entities/contatti.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Contatti]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [ContattiController],
  providers: [ContattiService],
})
export class ContattiModule {}

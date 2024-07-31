import { Module } from "@nestjs/common";
import { AcquistoService } from "./acquisto.service";
import { AcquistoController } from "./acquisto.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { expiresIn, jwtkey } from "src/jwtkey/jwtkey.service";
import { JwtModule } from "@nestjs/jwt";
import { Acquisto } from "./entities/acquisto.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Acquisto]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [AcquistoController],
  providers: [AcquistoService],
})
export class AcquistoModule {}

import { Module } from "@nestjs/common";
import { DefuntoService } from "./defunto.service";
import { DefuntoController } from "./defunto.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";
import { Defunto } from "./entities/defunto.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Defunto]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [DefuntoController],
  providers: [DefuntoService],
})
export class DefuntoModule {}

import { Module } from "@nestjs/common";
import { CimiteroService } from "./cimitero.service";
import { CimiteroController } from "./cimitero.controller";
import { Cimitero } from "./entities/cimitero.entity";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Cimitero]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [CimiteroController],
  providers: [CimiteroService],
})
export class CimiteroModule {}

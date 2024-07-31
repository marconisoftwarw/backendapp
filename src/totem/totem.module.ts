import { Module } from "@nestjs/common";
import { TotemService } from "./totem.service";
import { TotemController } from "./totem.controller";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";
import { Totem } from "./entities/totem.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Totem]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [TotemController],
  providers: [TotemService],
})
export class TotemModule {}

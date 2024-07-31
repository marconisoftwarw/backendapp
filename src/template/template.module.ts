import { Module } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { TemplateController } from "./template.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { jwtkey, expiresIn } from "src/jwtkey/jwtkey.service";
import { Template } from "./entities/template.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Template]),
    JwtModule.register({
      secret: jwtkey,
      signOptions: { expiresIn: expiresIn },
    }),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}

import { Module } from "@nestjs/common";
import { TotemhardwareService } from "./totemhardware.service";
import { TotemhardwareController } from "./totemhardware.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Totemhardware } from "./entities/totemhardware.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Totemhardware])],
  controllers: [TotemhardwareController],
  providers: [TotemhardwareService],
})
export class TotemhardwareModule {}

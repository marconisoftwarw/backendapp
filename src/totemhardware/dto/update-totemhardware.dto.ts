import { PartialType } from "@nestjs/mapped-types";
import { CreateTotemhardwareDto } from "./create-totemhardware.dto";

export class UpdateTotemhardwareDto extends PartialType(
  CreateTotemhardwareDto,
) {}

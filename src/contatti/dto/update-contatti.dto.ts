import { PartialType } from "@nestjs/mapped-types";
import { CreateContattiDto } from "./create-contatti.dto";

export class UpdateContattiDto extends PartialType(CreateContattiDto) {}

import { PartialType } from "@nestjs/mapped-types";
import { CreateTotemDto } from "./create-totem.dto";

export class UpdateTotemDto extends PartialType(CreateTotemDto) {}

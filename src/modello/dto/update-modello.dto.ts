import { PartialType } from "@nestjs/mapped-types";
import { CreateModelloDto } from "./create-modello.dto";

export class UpdateModelloDto extends PartialType(CreateModelloDto) {}

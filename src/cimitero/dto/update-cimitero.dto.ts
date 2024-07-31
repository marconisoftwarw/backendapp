import { PartialType } from "@nestjs/mapped-types";
import { CreateCimiteroDto } from "./create-cimitero.dto";

export class UpdateCimiteroDto extends PartialType(CreateCimiteroDto) {}

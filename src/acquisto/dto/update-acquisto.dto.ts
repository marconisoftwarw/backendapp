import { PartialType } from "@nestjs/mapped-types";
import { CreateAcquistoDto } from "./create-acquisto.dto";

export class UpdateAcquistoDto extends PartialType(CreateAcquistoDto) {}

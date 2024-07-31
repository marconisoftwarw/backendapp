import { PartialType } from "@nestjs/mapped-types";
import { CreateDefuntoDto } from "./create-defunto.dto";

export class UpdateDefuntoDto extends PartialType(CreateDefuntoDto) {}

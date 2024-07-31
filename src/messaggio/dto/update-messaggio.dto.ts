import { PartialType } from "@nestjs/mapped-types";
import { CreateMessaggioDto } from "./create-messaggio.dto";

export class UpdateMessaggioDto extends PartialType(CreateMessaggioDto) {}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDefuntoDto {
  @ApiProperty({ description: "nome del defunto" })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: "email of user" })
  @IsNotEmpty()
  cognome: string;

  @ApiProperty({ description: "id del cimitero" })
  @IsNumber()
  idCimitero: number;

  @ApiProperty({ description: "Data morte del defunto" })
  dataMorte: String;

  @ApiProperty({ description: "id utente" })
  @IsNumber()
  idUtente: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTotemDto {
  @ApiProperty({ description: "nome del totem" })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsNumber()
  idCimitero: number;

  @IsNotEmpty()
  @IsNumber()
  idTotemHardware: number;
}

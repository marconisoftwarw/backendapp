import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Cimitero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "nome del cimitero" })
  @Column({ length: 150 })
  @MinLength(1)
  @IsString()
  nome: string;

  @ApiProperty({ description: "Nazione" })
  @Column({ length: 200 })
  @MinLength(2)
  @IsString()
  nazione: string;

  @ApiProperty({ description: "Citta" })
  @Column({ length: 200 })
  @MinLength(1)
  @IsString()
  citta: string;

  @ApiProperty({ description: "Regione" })
  @Column({ length: 200 })
  @MinLength(1)
  @IsString()
  regione: string;
}

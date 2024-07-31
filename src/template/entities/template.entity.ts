import * as typeorm from "typeorm";
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Cimitero } from "src/cimitero/entities/cimitero.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "nome del defunto" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ description: "testo top del defunto" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  @IsNotEmpty()
  testo: string;

  @ApiProperty({ description: "template che viene visualizzato nel cimitero" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  @IsNotEmpty()
  template: string;

  @ApiProperty({ description: "immagine 1" })
  @Column({ length: 150 })
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  image1: string;

  @ApiProperty({ description: "immagine 2" })
  @Column({ length: 150 })
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  image2: string;

  @ApiProperty({ description: "immagine 3" })
  @Column({ length: 150 })
  @MinLength(1)
  @IsString()
  @IsNotEmpty()
  image3: string;

  @ApiProperty({ description: "Cimitero di residenza" })
  @typeorm.ManyToOne((type) => Cimitero, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idCimitero" })
  cimitero: Cimitero;

  @typeorm.Column({ nullable: true })
  @IsNotEmpty()
  idCimitero: number;

  @ApiProperty({ description: "Utente inserimento" })
  @typeorm.ManyToOne((type) => User, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idUser" })
  utente: User;

  @typeorm.Column({ nullable: true })
  @IsNotEmpty()
  idUser: number;
}

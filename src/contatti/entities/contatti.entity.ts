import * as typeorm from "typeorm";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Defunto } from "src/defunto/entities/defunto.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Contatti {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "name of user" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  name: string;

  @ApiProperty({ description: "surname of user" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  surname: string;

  @ApiProperty({ description: "messaggio of user" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(300)
  @IsString()
  messaggio: string;

  @ApiProperty({ description: "Defunto inserimento" })
  @typeorm.ManyToOne(() => Defunto, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idDefunto" })
  defunto: Defunto;

  @typeorm.Column({ nullable: true })
  @IsNotEmpty()
  idDefunto: number;

  @typeorm.Column({ nullable: false, default: false })
  approvazione: boolean;

  @ApiProperty({ description: "Utente inserimento" })
  @typeorm.ManyToOne(() => User, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idUtente" })
  utente: User;

  @typeorm.Column({ nullable: true })
  idUtente: number;
}

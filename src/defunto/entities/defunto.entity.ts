import * as typeorm from "typeorm";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Cimitero } from "src/cimitero/entities/cimitero.entity";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Defunto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "nome del defunto" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  nome: string;

  @ApiProperty({ description: "cognome del defunto" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  cognome: string;

  @ApiProperty({ description: "data morte del defunto" })
  @IsString()
  @Column()
  dataMorte: String;

  @ApiProperty({ description: "data nascita del defunto" })
  @IsString()
  @Column()
  dataNascita: String;

  @ApiProperty({ description: "luogo di sepoltura" })
  @IsString()
  @Column()
  luogodisepoltura: String;

  @ApiProperty({ description: "Soprannome" })
  @IsString()
  @Column()
  soprannome: String;

  @ApiProperty({ description: "Cimitero di residenza" })
  @typeorm.ManyToOne(() => Cimitero, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idCimitero" })
  cimitero: Cimitero;

  @typeorm.Column({ nullable: true })
  @IsNotEmpty()
  idCimitero: number;

  @ApiProperty({ description: "Utente che ha inserito l'acquisto" })
  @typeorm.ManyToOne(() => User, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idUtente" })
  utente: User;

  @typeorm.Column({ nullable: true })
  idUtente: number;

  @Column({ nullable: true })
  idUrna: String;
}

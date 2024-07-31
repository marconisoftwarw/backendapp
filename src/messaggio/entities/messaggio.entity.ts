import * as typeorm from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Messaggio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "testo del defunto" })
  @Column({ length: 150 })
  @MinLength(1)
  @IsString()
  testo: string;

  @ApiProperty({ description: "Utente che ha l'invio del messaggio" })
  @typeorm.ManyToOne((type) => User, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idUtenteSend" })
  utentesend: User;

  @typeorm.Column({ nullable: false })
  idUtenteSend: number;

  @Column()
  @MinLength(1)
  @MaxLength(500)
  @IsString()
  email: String;

  @ApiProperty({ description: "Identifica se una riga è un immagine" })
  @Column({ default: false })
  isImage: boolean;
}

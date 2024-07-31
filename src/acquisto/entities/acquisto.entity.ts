import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import * as typeorm from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Totem } from "src/totem/entities/totem.entity";

@Entity()
export class Acquisto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Utente che ha effettuato l'acquisto" })
  @typeorm.ManyToOne((type) => User, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idUtente" })
  utente: User;

  @typeorm.Column({ nullable: false })
  idUtente: number;

  @ApiProperty({ description: "Identificativo totem presente nel cimitero" })
  @typeorm.ManyToOne((type) => Totem, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idTotem" })
  totem: Totem;

  @typeorm.Column({ nullable: false })
  idTotem: number;

  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
  })
  dataAcquisto: Date;
}

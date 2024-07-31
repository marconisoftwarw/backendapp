import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Cimitero } from "src/cimitero/entities/cimitero.entity";
import * as typeorm from "typeorm";

@Entity()
export class Totemhardware extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "Cimitero di residenza" })
  @typeorm.ManyToOne((type) => Cimitero, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idCimitero" })
  cimitero: Cimitero;

  @typeorm.Column()
  @IsNotEmpty()
  idCimitero: number;
}

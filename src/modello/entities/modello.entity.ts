import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Modello extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "nome del modello esempio foto,video,ecc.." })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  name: string;

  @ApiProperty({ description: "link of file" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  linkfile: string;
}

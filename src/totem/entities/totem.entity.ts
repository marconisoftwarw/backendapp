import * as typeorm from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Cimitero } from "src/cimitero/entities/cimitero.entity";
import { Totemhardware } from "src/totemhardware/entities/totemhardware.entity";

@typeorm.Entity()
export class Totem extends typeorm.BaseEntity {
  @typeorm.PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: "nome del totem" })
  @typeorm.Column({ default: null })
  @MinLength(1)
  @MaxLength(200)
  @IsString()
  nome: string;

  @ApiProperty({ description: "Cimitero di residenza" })
  @typeorm.ManyToOne((type) => Cimitero, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idCimitero" })
  cimitero: Cimitero;

  @typeorm.Column({ nullable: false })
  idCimitero: number;

  @ApiProperty({ description: "Totem di residenza" })
  @typeorm.ManyToOne((type) => Totemhardware, { onDelete: "CASCADE" })
  @typeorm.JoinColumn({ name: "idTotemHardware" })
  totemHardware: Totemhardware;

  @typeorm.Column({ nullable: false })
  idTotemHardware: number;
}

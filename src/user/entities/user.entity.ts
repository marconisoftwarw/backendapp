import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {
  IsBoolean,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { sendEmail,UserType} from "../../support";

@Entity()
export class User extends BaseEntity {
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

  @ApiProperty({ description: "username of user" })
  @Column({ length: 150, unique: true })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  username: string;

  @ApiProperty({ description: "password of user" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  password: string;

  @ApiProperty({ description: "email of user" })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "Boolean che if user is enable or disable" })
  @Column({ default: true })
  @IsBoolean()
  enable: Boolean;

  @ApiProperty({ description: "Define typology of user" })
  @Column()
  type: UserType;

  @ApiProperty({ description: "Data inserimento" })
  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
    type: "timestamp",
  })
  dataregistrazione: String;
}

export class UtenteLogin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @ApiProperty({ description: "username of user" })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  username: string;

  @ApiProperty({ description: "password of user" })
  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  password: string;
}

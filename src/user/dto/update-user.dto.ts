import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsEmail } from "class-validator/types/decorator/string/IsEmail";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @ApiProperty({ description: "email of user" })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: "password of user" })
  password: string;
}

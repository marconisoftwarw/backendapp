import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateModelloDto } from "src/modello/dto/create-modello.dto";
import { UpdateModelloDto } from "src/modello/dto/update-modello.dto";
import { AcquistoService } from "./acquisto.service";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("acquisto")
@Controller("acquisto")
export class AcquistoController {
  constructor(
    private readonly service: AcquistoService,
    private jwtservice: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createModelloDto: CreateModelloDto,
    @Req() request: Request,
  ) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.create(createModelloDto);
  }

  @Get()
  async findAll(@Req() request: Request) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.findAll();
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateModelloDto: UpdateModelloDto,
    @Req() request: Request,
  ) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.update(+id, updateModelloDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() request: Request) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.remove(+id);
  }
}

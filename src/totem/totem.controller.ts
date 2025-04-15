import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UnauthorizedException,
} from "@nestjs/common";
import { TotemService } from "./totem.service";
import { CreateTotemDto } from "./dto/create-totem.dto";
import { UpdateTotemDto } from "./dto/update-totem.dto";
import { JwtService } from "@nestjs/jwt";
import { request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("totem")
@Controller("totem")
export class TotemController {
  constructor(
    private readonly service: TotemService,
    private jwtservice: JwtService
  ) {}

  @Post()
  async create(@Body() createTotemDto: CreateTotemDto) {
    console.log(createTotemDto.idTotemHardware);
    return await this.service.create(createTotemDto);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.findTotemByCimitero(+id);
  }

  @Put(":id/:idUtenteVisibile")
  async update(
    @Param("id") id: string,
    @Param("idUtenteVisibile") idUtenteVisibile: number
  ) {
    console.log(idUtenteVisibile);
    return await this.service.update(+id, idUtenteVisibile);
  }

  @Post("/delete")
  async remove(@Body("id") id: string) {
    return await this.service.remove(+id);
  }
}

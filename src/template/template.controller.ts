import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UnauthorizedException,
} from "@nestjs/common";
import { TemplateService } from "./template.service";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { JwtService } from "@nestjs/jwt";
import { request } from "express";
import { TemplateType } from "src/support";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("template")
@Controller("template")
export class TemplateController {
  constructor(
    private readonly service: TemplateService,
    private jwtservice: JwtService
  ) {}

  @Post("/generate")
  async generate(
    @Body("nome") nome: string,
    @Body("testo") testo: string,
    @Body("image1") image1: string,
    @Body("image2") image2: string,
    @Body("image3") image3: string,
    @Body("idUser") idUser: number,
    @Body("idCimitero") idCimitero: number,
    @Body("templateType") templateType: TemplateType,
    @Body("idTotem") idTotem: number
  ) {
    return await this.service.generatetemplate(
      nome,
      testo,
      image1,
      image2,
      image3,
      idUser,
      idCimitero,
      idTotem,
      templateType
    );
  }

  @Get()
  async findAll() {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.update(+id, updateTemplateDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.service.remove(+id);
  }
}

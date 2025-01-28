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
import { ModelloService } from "./modello.service";
import { CreateModelloDto } from "./dto/create-modello.dto";
import { UpdateModelloDto } from "./dto/update-modello.dto";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("modello")
@Controller("modello")
export class ModelloController {
  constructor(
    private readonly modelloService: ModelloService,
    private jwtservice: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createModelloDto: CreateModelloDto,
    @Req() request: Request,
  ) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.modelloService.create(createModelloDto);
  }

  @Get()
  async findAll(@Req() request: Request) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.modelloService.findAll();
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateModelloDto: UpdateModelloDto,
    @Req() request: Request,
  ) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.modelloService.update(+id, updateModelloDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Req() request: Request) {
    return !(await this.jwtservice.verifyAsync(request.cookies["jwt"]))
      ? new UnauthorizedException()
      : await this.modelloService.remove(+id);
  }
}

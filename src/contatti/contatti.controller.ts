import { Controller, Get, Post, Body, Put, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UpdateMessaggioDto } from "src/messaggio/dto/update-messaggio.dto";
import { ContattiService } from "./contatti.service";
import { CreateContattiDto } from "./dto/create-contatti.dto";

@ApiTags("contatti")
@Controller("contatti")
export class ContattiController {
  messaggioService: any;
  constructor(private readonly contattiService: ContattiService) {}

  @Post()
  create(@Body() createContattiDto: CreateContattiDto) {
    return this.contattiService.create(createContattiDto);
  }

  @Get()
  findAll() {
    return this.contattiService.findAll();
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateMessaggioDto) {
    return this.contattiService.update(+id, dto);
  }
}

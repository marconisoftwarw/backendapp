import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DefuntoService } from "./defunto.service";
import { CreateDefuntoDto } from "./dto/create-defunto.dto";

@ApiTags("defunto")
@Controller("defunto")
export class DefuntoController {
  constructor(private readonly defuntoService: DefuntoService) {}

  @Post()
  create(@Body() createDefuntoDto: CreateDefuntoDto) {
    return this.defuntoService.create(createDefuntoDto);
  }

  @Get()
  findAll() {
    return this.defuntoService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.defuntoService.findOne(+id);
  }

  @Post("/delete")
  async remove(@Body("id") id: string) {
    return await this.defuntoService.remove(+id);
  }

  @Post("/search")
  async search(
    @Body("name") name: string,
    @Body("regione") regione: string,
    @Body("citta") citta: string
  ) {
    return await this.defuntoService.findByName(name, regione, citta);
  }

  @Post("/updateurnae")
  async updateurna(@Body("id") id: number, @Body("idUrna") idUrna: string) {
    return await this.defuntoService.updateurna(id, idUrna);
  }

  @Post("/follow")
  async follow(
    @Body("nome") nome: string,
    @Body("cognome") cognome: string,
    @Body("email") email: string,
    @Body("NomeDefunto") NomeDefunto: string
  ) {
    console.log(nome, cognome, email, NomeDefunto);
    return await this.defuntoService.sendmail(
      nome,
      cognome,
      email,
      NomeDefunto
    );
  }
}

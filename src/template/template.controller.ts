import {
  Controller,
  Post,
  Body,
  Logger,
  Delete,
  Get,
  Param,
  Put,
} from "@nestjs/common";
import { TemplateService } from "./template.service";
import { TemplateType } from "src/support";
import { UpdateTemplateDto } from "./dto/update-template.dto";

@Controller("template")
export class TemplateController {
  private readonly logger = new Logger(TemplateController.name);

  constructor(private readonly service: TemplateService) {}

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
    this.logger.log("Received request for /generate with the following data:");
    this.logger.debug({
      nome,
      testo,
      image1,
      image2,
      image3,
      idUser,
      idCimitero,
      templateType,
      idTotem,
    });

    return await this.service.generatetemplate(
      nome,
      testo,
      image1,
      idUser,
      idCimitero,
      idTotem,
      templateType
    );
  }

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.service.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateTemplateDto: UpdateTemplateDto
  ) {
    return await this.service.update(+id, updateTemplateDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.service.remove(+id);
  }
}

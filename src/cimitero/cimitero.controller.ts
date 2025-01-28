import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Res,
  StreamableFile,
} from "@nestjs/common";
import { CimiteroService } from "./cimitero.service";
import { CreateCimiteroDto } from "./dto/create-cimitero.dto";
import { Response, Request } from "express";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("cimitero")
@Controller("cimitero")
export class CimiteroController {
  constructor(private readonly service: CimiteroService) {}

  @Post()
  async create(
    @Body() createCimiteroDto: CreateCimiteroDto,
    @Req() request: Request,
  ) {
    return await this.service.create(createCimiteroDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(+id);
  }

  @Post("/delete")
  async remove(@Body("id") id: string) {
    return await this.service.remove(+id);
  }

  @Get("/get/:filename")
  generateFile(
    @Res({ passthrough: true }) res: Response,
    @Param("filename") FilenNameDownload: string,
  ): StreamableFile {
    try {
      const fileName = "cimitero.zip";
      var fs = require("fs");

      this.service.zipFolder(FilenNameDownload.toString().replace(".zip", ""));
      const fileStream = fs.createReadStream(FilenNameDownload);

      fileStream.on("end", () => {
        try {
        } catch (error) {
          console.log("Errore: " + error.message);
        }
      });

      res.set({
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      });
      return new StreamableFile(fileStream);
    } catch (error) {
      console.log(error);
    }
  }
}

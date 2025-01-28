import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { MessaggioService } from "./messaggio.service";
import { CreateMessaggioDto } from "./dto/create-messaggio.dto";
import { UpdateMessaggioDto } from "./dto/update-messaggio.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("messaggio")
@Controller("messaggio")
export class MessaggioController {
  constructor(private readonly messaggioService: MessaggioService) {}

  @Post()
  create(@Body() createMessaggioDto: CreateMessaggioDto) {
    console.log(createMessaggioDto);
    return this.messaggioService.create(createMessaggioDto);
  }

  @Post("/search")
  async findOnebyEmail(@Body("email") email: string) {
    return await this.messaggioService.findOnebyEmail(email);
  }

  @Get()
  findAll() {
    return this.messaggioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.messaggioService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateMessaggioDto: UpdateMessaggioDto,
  ) {
    return this.messaggioService.update(+id, updateMessaggioDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.messaggioService.remove(+id);
  }

  @Post("/addimage")
  async addimage(@Body("image") image: string) {
    return await this.messaggioService.saveimage(image);
  }
}

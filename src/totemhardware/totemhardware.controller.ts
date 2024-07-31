import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { TotemhardwareService } from "./totemhardware.service";
import { CreateTotemhardwareDto } from "./dto/create-totemhardware.dto";
import { UpdateTotemhardwareDto } from "./dto/update-totemhardware.dto";

@Controller("totemhardware")
export class TotemhardwareController {
  constructor(private readonly totemhardwareService: TotemhardwareService) {}

  @Post()
  create(@Body() createTotemhardwareDto: CreateTotemhardwareDto) {
    return this.totemhardwareService.create(createTotemhardwareDto);
  }

  @Get()
  findAll() {
    return this.totemhardwareService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.totemhardwareService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateTotemhardwareDto: UpdateTotemhardwareDto
  ) {
    return this.totemhardwareService.update(+id, updateTotemhardwareDto);
  }

  @Delete("/delete/:id")
  remove(@Param("id") id: string) {
    return this.totemhardwareService.remove(+id);
  }
}

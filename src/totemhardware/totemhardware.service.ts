import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTotemhardwareDto } from "./dto/create-totemhardware.dto";
import { UpdateTotemhardwareDto } from "./dto/update-totemhardware.dto";
import { Totemhardware } from "./entities/totemhardware.entity";

@Injectable()
export class TotemhardwareService {
  constructor(
    @InjectRepository(Totemhardware) private repo: Repository<Totemhardware>
  ) {}

  create(dto: CreateTotemhardwareDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, dto: UpdateTotemhardwareDto) {
    return this.repo.update(id, dto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}

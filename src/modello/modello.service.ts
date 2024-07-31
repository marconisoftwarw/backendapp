import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateModelloDto } from "./dto/create-modello.dto";
import { UpdateModelloDto } from "./dto/update-modello.dto";
import { Modello } from "./entities/modello.entity";

@Injectable()
export class ModelloService {
  constructor(@InjectRepository(Modello) private repo: Repository<Modello>) {}

  create(dto: CreateModelloDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, updateModelloDto: UpdateModelloDto) {
    return this.repo.update(+id, updateModelloDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}

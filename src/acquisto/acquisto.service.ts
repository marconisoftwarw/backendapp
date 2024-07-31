import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAcquistoDto } from "./dto/create-acquisto.dto";
import { UpdateAcquistoDto } from "./dto/update-acquisto.dto";
import { Acquisto } from "./entities/acquisto.entity";

@Injectable()
export class AcquistoService {
  constructor(@InjectRepository(Acquisto) private repo: Repository<Acquisto>) {}

  create(dto: CreateAcquistoDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, updateModelloDto: UpdateAcquistoDto) {
    return this.repo.update(+id, updateModelloDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}

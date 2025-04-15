import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm/repository/Repository";
import { CreateTotemDto } from "./dto/create-totem.dto";
import { UpdateTotemDto } from "./dto/update-totem.dto";
import { Totem } from "./entities/totem.entity";

@Injectable()
export class TotemService {
  constructor(@InjectRepository(Totem) private repo: Repository<Totem>) {}
  async create(createTotemDto: CreateTotemDto) {
    return this.repo.save(createTotemDto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findTotemByCimitero(id: number) {
    var ris = await this.findAll();
    var listaTotemFilter = [];
    for (var i = 0; i < ris.length; i++) {
      if (ris[i].idCimitero === id) {
        listaTotemFilter.push(ris[i]);
      }
    }
    return listaTotemFilter;
  }
  async update(id: number, idUtenteVisibile: number) {
    console.log("FASE 2");
    console.log(idUtenteVisibile);
    console.log(id);
    return await this.repo.update(id, { idUtenteVisibile });
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}

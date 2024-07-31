import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, getRepository, Repository } from "typeorm";
import { CreateContattiDto } from "./dto/create-contatti.dto";
import { UpdateContattiDto } from "./dto/update-contatti.dto";
import { Contatti } from "./entities/contatti.entity";

@Injectable()
export class ContattiService {
  constructor(
    @InjectRepository(Contatti) private repo: Repository<Contatti>,
    @InjectConnection() private readonly connection: Connection
  ) {}
  create(createContattiDto: CreateContattiDto) {
    return this.repo.save(createContattiDto);
  }

  findAll() {
    return this.repo.find();
  }

  update(id: number, dto: UpdateContattiDto) {
    return this.repo.update(id, dto);
  }
}

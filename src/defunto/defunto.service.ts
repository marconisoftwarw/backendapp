import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { CreateDefuntoDto } from "./dto/create-defunto.dto";
import { Defunto } from "./entities/defunto.entity";
import { sendEmail } from "../support";

@Injectable()
export class DefuntoService {
  constructor(
    @InjectRepository(Defunto) private repo: Repository<Defunto>,
    @InjectConnection() private readonly connection: Connection
  ) {}
  async create(dto: CreateDefuntoDto) {
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

  remove(id: number) {
    return this.repo.delete(id);
  }

  async updateurna(id: number, idUrna: String) {
    return await this.connection
      .getRepository(Defunto)
      .createQueryBuilder("defunto")
      .update<Defunto>(Defunto, { idUrna: idUrna })
      .where("defunto.id = :id", { id: Number(id) })
      .updateEntity(true)
      .execute();
  }

  async findByName(nome: string, regione: string, citta: string) {
    var list;
    try {
      if (nome.length > 0) {
        list = await this.connection
          .getRepository(Defunto)
          .createQueryBuilder("defunto")
          .where("defunto.nome like :nome", { nome: `%${nome}%` })
          .getMany();
      }
    } catch (err) {
      console.log("Error: " + err.message);
      list = await this.findAll();
    }
    return list;
  }

  async sendmail(
    nome: String,
    cognome: String,
    email: String,
    nomeDefunto: String
  ) {
    return await sendEmail(
      nome +
        " " +
        cognome +
        " ha chiesto di seguire il defunto: " +
        nomeDefunto,
      email,
      "Richiest MemoryRip",
      true
    );
  }
}

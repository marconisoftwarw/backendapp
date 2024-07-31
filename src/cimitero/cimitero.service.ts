import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCimiteroDto } from "./dto/create-cimitero.dto";
import { UpdateCimiteroDto } from "./dto/update-cimitero.dto";
import { Cimitero } from "./entities/cimitero.entity";
var AdmZip = require("adm-zip");
@Injectable()
export class CimiteroService {
  constructor(@InjectRepository(Cimitero) private repo: Repository<Cimitero>) {}

  /**
   * Create new Cimitero
   * @param dto
   * @returns
   */
  create(dto: CreateCimiteroDto) {
    return this.repo.save(dto);
  }

  /**
   * Get list of all cimitero
   * @returns
   */
  findAll() {
    return this.repo.find();
  }

  /**
   * Get cimitero by id
   */
  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id: id,
      },
    });
  }

  /**
   * Update single cimitero
   * @param id
   * @param UpdateCimiteroDto
   * @returns
   */
  update(id: number, UpdateCimiteroDto: UpdateCimiteroDto) {
    return this.repo.update(id, UpdateCimiteroDto);
  }

  /**
   * Remove cimitero
   * @param id
   * @returns
   */
  async remove(id: number) {
    var element = await this.findOne(id);
    return this.repo.remove(element);
  }

  async zipFolder(folderName: string) {
    var fs = require("fs");
    const zip = new AdmZip();
    const outputFile = folderName + ".zip";
    try {
      fs.unlinkSync(outputFile);
    } catch (e) {
      console.log("Errore non è presente un file da eliminare");
    }
    zip.addLocalFolder("./" + folderName);
    zip.writeZip(outputFile);
    return true;
  }
}

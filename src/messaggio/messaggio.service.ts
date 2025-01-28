import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMessaggioDto } from "./dto/create-messaggio.dto";
import { UpdateMessaggioDto } from "./dto/update-messaggio.dto";
import { Messaggio } from "./entities/messaggio.entity";

@Injectable()
export class MessaggioService {
  constructor(
    @InjectRepository(Messaggio) private repo: Repository<Messaggio>,
  ) {}

  create(createMessaggioDto: CreateMessaggioDto) {
    return this.repo.save(createMessaggioDto);
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

  async findOnebyEmail(emailuser: string) {
    var lista = await this.findAll();
    var listamessaggi = [];
    if (lista.length != null) {
      for (var i = 0; i < lista.length; i++) {
        if (lista[i].email == emailuser) {
          listamessaggi.push(lista[i]);
        }
      }
    }
    return listamessaggi;
  }

  update(id: number, updateMessaggioDto: UpdateMessaggioDto) {
    return this.repo.update(id, updateMessaggioDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async saveimage(image: string) {
    try {
      //Creo il direttorio che contiene le immagini
      var fs = require("fs");
      let base64Image = image.split(";base64,").pop();
      var dir = "./messagge";
      var imgpath = "/" + Math.floor(Math.random() * 1000000) + ".png";
      if (image.match("/.jpg/")) {
        imgpath = "/" + Math.floor(Math.random() * 1000000) + ".jpg";
      } else {
        imgpath = "/" + Math.floor(Math.random() * 1000000) + ".jpeg";
      }
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      //Creo il file
      fs.writeFile(
        dir + imgpath,
        base64Image,
        { encoding: "base64" },
        function (err) {
          return err;
        },
      );
      return imgpath;
    } catch (err) {
      return false;
    }
  }
}

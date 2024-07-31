import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TemplateType } from "src/support";
import { Repository } from "typeorm";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { Template } from "./entities/template.entity";
const AdmZip = require("adm-zip");
@Injectable()
export class TemplateService {
  constructor(@InjectRepository(Template) private repo: Repository<Template>) {}

  async create(dto: CreateTemplateDto) {
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

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.repo.update(id, updateTemplateDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  /**
   * Gestione a file zip
   * @param folderName
   * @param fileName
   * @returns
   */
  async zipFolder(folderName: string) {
    var fs = require("fs");
    const zip = new AdmZip();
    const outputFile = folderName + ".zip";
    zip.addLocalFolder("./" + folderName).then(() => {
      zip.writeZip(outputFile);
    });
    try {
      fs.unlinkSync(outputFile);
    } catch (err) {
      console.log("Errore non è presente un file da eliminare: " + err);
    }
    return true;
  }

  /**
   * Funzione generazione template
   * @param nome
   * @param testo
   * @param image1
   * @param image2
   * @param image3
   * @param idUser
   * @param idCimitero
   * @param idTotem
   * @param templateType
   * @returns
   */
  async generatetemplate(
    nome: string,
    testo: string,
    image1: string,
    image2: string,
    image3: string,
    idUser: number,
    idCimitero: number,
    idTotem: number,
    templateType: TemplateType
  ) {
    var testotemp = testo ? testo : " ";
    var fs = require("fs");
    //1) Prima di creare i file dell'immagine su file system verifico che esista la cartella su file system
    !fs.existsSync(`./cimitero` + idCimitero + "/") &&
      fs.mkdirSync(`./cimitero` + idCimitero + "/", { recursive: true });
    //2) Procedo a creare il file su filesystem
    var templateHTML = "";
    if (templateType === TemplateType.TEMPLATE1) {
      let base64Image = image1.split(";base64,").pop();
      var dir = "./cimitero" + idCimitero + "/" + idTotem;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFile(
        "./cimitero" + idCimitero + "/" + idTotem + "/image.png",
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML =
        "<!DOCTYPE html> <html>  <head><title> Memoryp</title> <meta name='viewport' content='width=device-width, initial-scale=1' /> <style> * { box-sizing: border-box; } body {  font-family: Verdana, sans-serif; } .mySlides { display: none;} img { vertical-align: middle; }  .slideshow-container { max-width: 400px;  position: relative; margin: auto; }  .text {  color: #f2f2f2; font-size: 15px; padding: 8px 12px;  position: absolute; bottom: 8px; width: 100%; text-align: center; }  .numbertext {  color: #f2f2f2; font-size: 12px; padding: 8px 12px; position: absolute; top: 0;  }  .dot {height: 15px; width: 15px;margin: 0 2px; background-color: #bbb;border-radius: 50%; display: inline-block; transition: background-color 0.6s ease; }  .active {  background-color: #717171; } .fade { animation-name: fade; animation-duration: 1.5s;}  @keyframes fade { from {opacity: 0.4; } to {opacity: 1;  }}@media only screen and (max-width: 300px) {.text {font-size: 11px;}} </style> </head> <body style='background-color:powderblue;'> <center> <h2>" +
        nome +
        "</h2> <p>Messaggio: " +
        testotemp +
        "</p>  <div class='slideshow-container'> <img src='image.png' style='width: 100%' /> </div> </center> </body> </html>";
    } else if (templateType === TemplateType.TEMPLATE2) {
      let base64Image = image1.split(";base64,").pop();
      var dir = "./cimitero" + idCimitero + "/" + idTotem;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFile(
        "./cimitero" + idCimitero + "/" + idTotem + "/image.png",
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML =
        "<!DOCTYPE html> <html>  <head><title> Memoryp</title><meta name='viewport' content='width=device-width, initial-scale=1' /> <style> * { box-sizing: border-box; } body {  font-family: Verdana, sans-serif; } .mySlides { display: none;} img { vertical-align: middle; }  .slideshow-container { max-width: 400px;  position: relative; margin: auto; }  .text {  color: #f2f2f2; font-size: 15px; padding: 8px 12px;  position: absolute; bottom: 8px; width: 100%; text-align: center; }  .numbertext {  color: #f2f2f2; font-size: 12px; padding: 8px 12px; position: absolute; top: 0;  }  .dot {height: 15px; width: 15px;margin: 0 2px; background-color: #bbb;border-radius: 50%; display: inline-block; transition: background-color 0.6s ease; }  .active {  background-color: #717171; } .fade { animation-name: fade; animation-duration: 1.5s;}  @keyframes fade { from {opacity: 0.4; } to {opacity: 1;  }}@media only screen and (max-width: 300px) {.text {font-size: 11px;}} </style> </head> <body style='background-color:#ffb8c6;'> <center> <h2>" +
        nome +
        "</h2> <p>Messaggio: " +
        testotemp +
        "</p>  <div class='slideshow-container'> <img src='image.png' style='width: 100%' /> </div> </center> </body> </html>";
    } else {
      let base64Image = image1.split(";base64,").pop();
      let base64Image2 = image2.split(";base64,").pop();
      let base64Image3 = image3.split(";base64,").pop();
      var dir = "./cimitero" + idCimitero + "/" + idTotem;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      fs.writeFile(
        "./cimitero" + idCimitero + "/" + idTotem + "/image.png",
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      fs.writeFile(
        "./cimitero" + idCimitero + "/" + idTotem + "/image2.png",
        base64Image2,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      fs.writeFile(
        "./cimitero" + idCimitero + "/" + idTotem + "/image3.png",
        base64Image3,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );

      templateHTML =
        "<!DOCTYPE html> <html> <head> <title> Memoryp</title><meta name='viewport' content='width=device-width, initial-scale=1' /> <style> * {   box-sizing: border-box;} body { font-family: Verdana, sans-serif; } .mySlides {display: none;}img { vertical-align: middle; } .slideshow-container {  max-width: 400px; position: relative;  margin: auto; } .text { color: #f2f2f2; font-size: 15px; padding: 8px 12px; position: absolute; bottom: 8px; width: 100%; text-align: center; } .numbertext { color: #f2f2f2;  font-size: 12px;  padding: 8px 12px;  position: absolute; top: 0;}.dot { height: 15px; width: 15px; margin: 0 2px; background-color: #bbb; border-radius: 50%; display: inline-block; transition: background-color 0.6s ease; } .active { background-color: #717171; }.fade {  animation-name: fade;animation-duration: 1.5s;} .column { float: left; width: 50%; padding: 10px; height: 300px; } .row:after { display: table; clear: both;}  @keyframes fade {from { opacity: 0.4;}to {  opacity: 1;  } } @media only screen and (max-width: 300px) { .text {font-size: 11px; }} </style>";
      templateHTML =
        templateHTML +
        "</head> <body style='background-color:#9dc3e7;'> <body> <img src='image3.png' style='width: 100%' /> <p></p>  <div class='row'> <div class='column' > <p><img src='image.png' style='width: 50%' /></p> <b>" +
        nome +
        "</b>  </div> <div class='column' >   <p>" +
        testo +
        "</p>  <p><img src='image2.png' style='width: 50%' /></p> </div>   </div> <div style='position: absolute; top: 80%;  left: 0; bottom: 0; right: 0;  width: auto;  height: auto;  max-width: 100%;max-height: 100%;  margin: auto auto 0;'> <img src='image3.png' style='width: 100%' /> </div> </body> </html>";
    }
    if (templateHTML.length > 0) {
      fs.writeFile(
        "./cimitero" + idCimitero + "/" + idTotem + "/index.html",
        templateHTML,
        function (err) {
          if (err) throw err;
        }
      );
    }
    return true;
  }
}

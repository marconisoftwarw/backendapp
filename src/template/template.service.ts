import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as fs from "fs";
import * as path from "path";
import * as AdmZip from "adm-zip";
import { CreateTemplateDto } from "./dto/create-template.dto";
import { UpdateTemplateDto } from "./dto/update-template.dto";
import { Template } from "./entities/template.entity";
import { TemplateType } from "src/support";
import axios from "axios";

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
    return this.repo.findOne({ where: { id } });
  }

  update(id: number, updateTemplateDto: UpdateTemplateDto) {
    return this.repo.update(id, updateTemplateDto);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  /**
   * Zip a folder
   * @param folderName - Name of the folder to zip
   * @returns {Promise<boolean>}
   */
  async zipFolder(folderName: string): Promise<boolean> {
    try {
      const zip = new AdmZip();
      const outputFile = `${folderName}.zip`;

      // Add folder to zip
      zip.addLocalFolder(`./${folderName}`);
      zip.writeZip(outputFile);

      // Clean up: delete zip file after creation (optional)
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
      }

      return true;
    } catch (error) {
      console.error("Error zipping folder:", error);
      return false;
    }
  }

  /**
   * Metodo principale per generare un template
   * @param nome Nome da visualizzare nel template
   * @param testo Testo descrittivo
   * @param image1 Immagine base64 caricata dall'utente
   * @param idUser ID dell'utente
   * @param idCimitero ID del cimitero
   * @param idTotem ID del totem
   * @param templateType Tipo di template (default/custom)
   * @returns Promise<boolean> che indica il successo o fallimento
   */
  async generatetemplate(
    nome: string,
    testo: string,
    image1: string,
    idUser: number,
    idCimitero: number,
    idTotem: number,
    templateType: TemplateType,
    message: string
  ): Promise<boolean> {
    try {
      const testoFinale = testo || " ";
      const baseDir = `./cimitero${idCimitero}/${idTotem}`;
      // Creazione della directory se non esiste
      this.ensureDirectoryExists(baseDir);

      // Salvataggio dell'immagine caricata dall'utente come "image.png"
      if (image1) {
        this.saveBase64Image(image1, path.join(baseDir, "image.png"));
      }

      // Download dell'immagine di sfondo
      const backgroundFile = path.join(baseDir, "background.png");
      console.log("templateType", templateType);
      await this.downloadAndSaveImage(
        this.getTemplateBackgroundURL(templateType),
        backgroundFile
      );

      // Generazione del file HTML
      const templateHTML = this.generateTemplateHTML(
        templateType,
        nome,
        testo,
        message,
        "background.png"
      );
      fs.writeFileSync(path.join(baseDir, "index.html"), templateHTML);

      return true;
    } catch (error) {
      console.error("Errore durante la generazione del template:", error);
      return false;
    }
  }

  /**
   * Ottiene l'URL per l'immagine di sfondo in base al tipo di template
   * @param templateType Tipo di template
   * @returns URL dell'immagine di sfondo
   */
  private getTemplateBackgroundURL(templateType: TemplateType): string {
    switch (templateType) {
      case TemplateType.TEMPLATE1:
        return "https://www.marconisoftware.com/assets/01.png";
      case TemplateType.TEMPLATE2:
        return "https://www.marconisoftware.com/assets/02.png";
      case TemplateType.TEMPLATE3:
        return "https://www.marconisoftware.com/assets/03.png";
      case TemplateType.TEMPLATE4:
        return "https://www.marconisoftware.com/assets/04.png";
      case TemplateType.TEMPLATE5:
        return "https://www.marconisoftware.com/assets/05.png";
      case TemplateType.TEMPLATE6:
        return "https://www.marconisoftware.com/assets/06.png";
      case TemplateType.TEMPLATE7:
        return "https://www.marconisoftware.com/assets/07.png";
      case TemplateType.TEMPLATE8:
        return "https://www.marconisoftware.com/assets/08.png";
      case TemplateType.TEMPLATE9:
        return "https://www.marconisoftware.com/assets/09.png";
      case TemplateType.TEMPLATE10:
        return "https://www.marconisoftware.com/assets/10.png";
      default:
        return "https://www.marconisoftware.com/assets/01.png";
    }
  }

  /**
   * Assicura che una directory esista, altrimenti la crea
   * @param dirPath Percorso della directory
   */
  private ensureDirectoryExists(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
      // Elimina la directory esistente e il suo contenuto
      fs.rmSync(dirPath, { recursive: true, force: true });
    }
    // Crea di nuovo la directory
    fs.mkdirSync(dirPath, { recursive: true });
  }

  /**
   * Salva un'immagine in formato base64 in un file
   * @param base64Data Dati in base64
   * @param filePath Percorso del file di destinazione
   */
  private saveBase64Image(base64Data: string, filePath: string): void {
    const imageData = base64Data.split(";base64,").pop();
    if (!imageData) {
      throw new Error("Formato immagine base64 non valido");
    }
    fs.writeFileSync(filePath, imageData, "base64");
  }

  /**
   * Scarica un'immagine da un URL e la salva in un file locale
   * @param url URL dell'immagine
   * @param filePath Percorso del file di destinazione
   */
  private async downloadAndSaveImage(
    url: string,
    filePath: string
  ): Promise<void> {
    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      fs.writeFileSync(filePath, response.data);
    } catch (error) {
      console.error(
        `Errore durante il download dell'immagine da ${url}:`,
        error
      );
      throw error;
    }
  }

  /**
   * Genera il contenuto HTML del template
   * @param templateType Tipo di template
   * @param nome Nome da visualizzare
   * @param testo Testo descrittivo
   * @param backgroundFile Percorso del file di sfondo
   * @returns Stringa HTML
   */
  private generateTemplateHTML(
    templateType: TemplateType,
    nome: string,
    testo1: string,
    testo2: string,
    backgroundFile: string
  ): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('${backgroundFile}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px;
            height: 200px;
            border-radius: 30%;
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left;
            color: black;
        }
        .slideshow-container p {
            text-align: right;
            color: black;
        }
    </style>
</head>
<body>
    <div class="slideshow-container">
        <img src="image.png" alt="Image" />
        <h2>${nome}</h2>
        <br></br>
        <p>${testo1}</p>
        <p>${testo2}</p>
    </div>
</body>
</html>`;
  }
}

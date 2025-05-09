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
      zip.addLocalFolder(`./${folderName}`);
      zip.writeZip(outputFile);
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

      this.ensureDirectoryExists(baseDir);

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
    if (templateType === TemplateType.TEMPLATE2) {
      return `<!DOCTYPE html>
<html>
<head>
  <title>${nome}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; font-family: 'Roboto Slab', serif; background: #fff; }
    body {
      background-image: url('${backgroundFile}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #000;
      padding: 20px;
    }
    .content {
      max-width: 600px;
      width: 100%;
    }
    .content img {
      width: 220px;
      height: 220px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 20px;
    }
    .content h2 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .content p {
      font-size: 18px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="content">
    <img src="image.png" alt="Image" />
    <h2>${nome}</h2>
    <p>${testo1}</p>
    <p>${testo2}</p>
  </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE1) {
      return `<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; font-family: 'Roboto Slab', serif; }
        body {
            background-image: url('${backgroundFile}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 600px;
            position: relative;
            margin: auto;
            text-align: left;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            color: #00aaff;
        }
        .slideshow-container img {
            margin: 10px 0;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
        }
        .slideshow-container h2 {
            margin-top: 10px;
        }
        .slideshow-container p {
            margin-top: 5px;
        }
        .slideshow-container .right-top {
            text-align: right;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="slideshow-container">
        <p class="right-top">${testo2}</p>
        <img src="image.png" alt="Image" />
        <h2>${nome}</h2>
        <p>${testo1}</p>
    </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE3) {
      return `<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; font-family: 'Roboto Slab', serif; }
        body {
            background-image: url('${backgroundFile}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            max-width: 800px;
            margin: auto;
            height: 100%;
            color: #00aaff;
            padding: 20px;
        }
        .right-top {
            text-align: right;
            margin-bottom: 20px;
        }
        .content {
            display: flex;
            flex-direction: row;
            align-items: center;
        }
        .image-section {
            flex: 0 0 160px;
            text-align: center;
        }
        .image-section img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
        }
        .image-section p {
            margin-top: 10px;
            font-weight: bold;
        }
        .text-section {
            flex: 1;
            padding-left: 30px;
        }
        .text-section h2 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .text-section p {
            font-size: 16px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="right-top">${testo2}</div>
        <div class="content">
            <div class="image-section">
                <img src="image.png" alt="Image" />
                <p>${nome}</p>
            </div>
            <div class="text-section">
                <h2>In ricordo di ${nome}</h2>
                <p>${testo1}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE4) {
      return `<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; font-family: 'Roboto Slab', serif; }
        body {
            background-image: url('${backgroundFile}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            max-width: 800px;
            margin: auto;
            height: 100%;
            padding: 20px;
            color: #00aaff;
        }
        .image-block {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 200px;
        }
        .image-block img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
        }
        .image-block .text {
            margin-top: 15px;
        }
        .image-block .text h2 {
            font-size: 22px;
            margin-bottom: 8px;
        }
        .image-block .text p {
            font-size: 16px;
            margin-bottom: 5px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="image-block">
            <img src="image.png" alt="Image" />
            <div class="text">
                <h2>${nome}</h2>
                <p>${testo1}</p>
                <p>${testo2}</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE5) {
      return `<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
         background-image: url('${backgroundFile}');
            height: 100%;
            font-family: 'Roboto Slab', serif;
            overflow: hidden;
        }
        body {
            background-color: #000;
            color: #ffffff;
        }
        .container {
            display: flex;
            height: 100%;
            width: 100%;
        }
        .text-section {
            width: 50%;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.6);
        }
        .text-section h1 {
            font-size: 32px;
            margin-bottom: 20px;
            color: #00aaff;
        }
        .text-section p {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 10px;
            color: #dddddd;
        }
        .image-section {
            width: 50%;
            height: 100%;
        }
        .image-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-section">
            <h1>${nome}</h1>
            <p>${testo1}</p>
            <p>${testo2}</p>
        </div>
        <div class="image-section">
            <img src="image.png" alt="Immagine" />
        </div>
    </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE6) {
      return `<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body {
         background-image: url('${backgroundFile}');
            height: 100%;
            font-family: 'Roboto Slab', serif;
            overflow: hidden;
        }
        body {
            background-color: #000;
            color: #ffffff;
        }
        .container {
            display: flex;
            flex-direction: row;
            height: 100vh;
            width: 100%;
        }
        .text-section {
            width: 50%;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.6);
        }
        .text-section h1 {
            font-size: 32px;
            margin-bottom: 20px;
            color: #00aaff;
        }
        .text-section p {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 10px;
            color: #dddddd;
        }
        .image-section {
            width: 50%;
            height: 100%;
        }
        .image-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-section">
            <h1>${nome}</h1>
            <p>${testo1}</p>
            <p>${testo2}</p>
        </div>
        <div class="image-section">
            <img src="image.png" alt="Immagine" />
        </div>
    </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE7) {
      return `<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body {
         background-image: url('${backgroundFile}');
            height: 100%;
            font-family: 'Roboto Slab', serif;
            background-color: #f0f0f0;
        }
        .container {
            display: flex;
            height: 100vh;
            width: 100%;
        }
        .text-section {
            width: 50%;
            padding: 60px 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #ffffff;
        }
        .text-section h1 {
            font-size: 32px;
            color: #333333; /* grigio scuro */
            margin-bottom: 20px;
        }
        .text-section p {
            font-size: 18px;
            line-height: 1.6;
            color: #555555;
            margin-bottom: 10px;
        }
        .image-section {
            width: 50%;
            height: 100%;
        }
        .image-section img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-section">
            <h1>${nome}</h1>
            <p>${testo1}</p>
            <p>${testo2}</p>
        </div>
        <div class="image-section">
            <img src="image.png" alt="Immagine" />
        </div>
    </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE8) {
      return `<!DOCTYPE html>
<html>
<head>
  <title>${nome}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
     background-image: url('${backgroundFile}');
      height: 100%;
      font-family: 'Roboto Slab', serif;
      background-color: #f0f0f0;
    }
    .container {
      display: flex;
      height: 100vh;
      width: 100%;
    }
    .image-section {
      width: 50%;
      height: 100%;
    }
    .image-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .text-section {
      width: 50%;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #ffffff;
    }
    .text-section h1 {
      font-size: 32px;
      color: #333333; /* grigio scuro */
      margin-bottom: 20px;
    }
    .text-section p {
      font-size: 18px;
      line-height: 1.6;
      color: #555555;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="image-section">
      <img src="image.png" alt="Immagine" />
    </div>
    <div class="text-section">
      <h1>${nome}</h1>
      <p>${testo1}</p>
      <p>${testo2}</p>
    </div>
  </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE9) {
      return `<!DOCTYPE html>
<html>
<head>
  <title>${nome}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      height: 100%;
       background-image: url('${backgroundFile}');
      font-family: 'Roboto Slab', serif;
      background-color: #f5f5f5;
    }
    .container {
      padding: 40px;
    }
    .top-section {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
    }
    .image-section {
      width: 150px;
      height: 150px;
      margin-right: 30px;
    }
    .image-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      display: block;
    }
    .text-section {
      flex: 1;
      min-width: 200px;
    }
    .text-section h1 {
      font-size: 28px;
      color: #333333;
      margin-bottom: 15px;
    }
    .text-section p {
      font-size: 17px;
      color: #555555;
      margin-bottom: 10px;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="top-section">
      <div class="image-section">
        <img src="image.png" alt="Immagine" />
      </div>
      <div class="text-section">
        <h1>${nome}</h1>
        <p>${testo1}</p>
        <p>${testo2}</p>
      </div>
    </div>
  </div>
</body>
</html>`;
    }
    if (templateType === TemplateType.TEMPLATE10) {
      return `<!DOCTYPE html>
<html>
<head>
  <title>${nome}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      background-image: url('${backgroundFile}');
      height: 100%;
      font-family: 'Roboto Slab', serif;
      background-color: #ffffff;
    }
    .container {
      display: flex;
      height: 100vh;
      width: 100%;
    }
    .image-section {
      width: 50%;
      height: 100%;
      position: relative;
    }
    .image-section img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .image-overlay {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #ffffff;
      font-size: 32px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
    }
    .text-section {
      width: 50%;
      padding: 60px 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .text-section p {
      font-size: 18px;
      line-height: 1.6;
      color: #c2185b; /* rosa scuro */
      margin-bottom: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="image-section">
      <img src="image.png" alt="Immagine" />
      <div class="image-overlay">${nome}</div>
    </div>
    <div class="text-section">
      <p>${testo1}</p>
      <p>${testo2}</p>
    </div>
  </div>
</body>
</html>`;
    }

    return `
<!DOCTYPE html>
<html>
<head>
    <title>${nome}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; font-family: 'Roboto Slab', serif; }
        body {
            background-image: url('${backgroundFile}');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 600px;
            position: relative;
            margin: auto;
            text-align: left;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .slideshow-container img {
            margin: 10px 0;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
        }
        .slideshow-container h2 {
            margin-top: 10px;
            color: black;
        }
        .slideshow-container p {
            color: black;
        }
    </style>
</head>
<body>
    <div class="slideshow-container">
        <img src="image.png" alt="Image" />
        <h2>${nome}</h2>
        <p>${testo1}</p>
        <p>${testo2}</p>
    </div>
</body>
</html>`;
  }
}

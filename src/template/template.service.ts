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
    !fs.existsSync(`./cimitero${idCimitero}/`) &&
      fs.mkdirSync(`./cimitero${idCimitero}/`, { recursive: true });
    //2) Procedo a creare il file su filesystem
    var templateHTML = "";
    const dir = `./cimitero${idCimitero}/${idTotem}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    
    if (templateType === TemplateType.TEMPLATE1) {
      let base64Image = image1.split(";base64,").pop();
      fs.writeFile(
        `${dir}/image.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('https://www.marconisoftware.com/assets/01.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right; /* Align the text to the right */
            height: 100%; /* Ensure the container takes the full available height */
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start (left) */
            justify-content: center; /* Center items vertically */
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px; /* Adjust width as needed */
            height: 200px; /* Adjust height as needed */
            border-radius: 10%; /* Make the image oval */
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left; /* Align the title to the left */
            color: black; /* Set text color to black */
        }
        .slideshow-container p {
            text-align: right; /* Align the paragraph to the right */
            color: black; /* Set text color to black */
        }
        @media only screen and (max-width: 300px) {
            .slideshow-container h2, .slideshow-container p {
                font-size: 11px; /* Adjust font size for small screens */
            }
        }
    </style>
</head>
<body>
    <div class='slideshow-container'>
        <img src="image.png" alt="Image" style="border-radius: 30%;margin-right: 10%" > <!-- Ensure the image displays properly and is oval -->
        <h2  style="margin-right: 50%">${nome} <br> ${testotemp}</br></h2> <!-- Name below the image -->
      
    </div>
</body>
</html>
 `;
    } else if (templateType === TemplateType.TEMPLATE2) {
      let base64Image = image1.split(";base64,").pop();
      fs.writeFile(
        `${dir}/image.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('https://www.marconisoftware.com/assets/02.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right; /* Align the text to the right */
            height: 100%; /* Ensure the container takes the full available height */
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start (left) */
            justify-content: center; /* Center items vertically */
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px; /* Adjust width as needed */
            height: 200px; /* Adjust height as needed */
            border-radius: 50%; /* Make the image oval */
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left; /* Align the title to the left */
            color: black; /* Set text color to black */
        }
        .slideshow-container p {
            text-align: right; /* Align the paragraph to the right */
            color: black; /* Set text color to black */
        }
        @media only screen and (max-width: 300px) {
            .slideshow-container h2, .slideshow-container p {
                font-size: 11px; /* Adjust font size for small screens */
            }
        }
    </style>
</head>
<body>
    <div class='slideshow-container'>
        <img src="image.png" alt="Image" style="border-radius: 30%;margin-right: 30%" > <!-- Ensure the image displays properly and is oval -->
        <h2  style="margin-right: 30%">${nome}</h2> <!-- Name below the image -->
        <div style="margin-left: 60%"> <p>Messaggio: ${testotemp}</p></div>
    </div>
</body>
</html>
 `;
    } else if (templateType === TemplateType.TEMPLATE3) {
      let base64Image = image1.split(";base64,").pop();
      fs.writeFile(
        `${dir}/image.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('https://www.marconisoftware.com/assets/03.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right; /* Align the text to the right */
            height: 100%; /* Ensure the container takes the full available height */
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start (left) */
            justify-content: center; /* Center items vertically */
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px; /* Adjust width as needed */
            height: 200px; /* Adjust height as needed */
            border-radius: 50%; /* Make the image oval */
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left; /* Align the title to the left */
            color: black; /* Set text color to black */
        }
        .slideshow-container p {
            text-align: right; /* Align the paragraph to the right */
            color: black; /* Set text color to black */
        }
        @media only screen and (max-width: 300px) {
            .slideshow-container h2, .slideshow-container p {
                font-size: 11px; /* Adjust font size for small screens */
            }
        }
    </style>
</head>
<body>
    <div class='slideshow-container'>
        <img src="image.png" alt="Image" style="border-radius: 30%;margin-right: 30%" > <!-- Ensure the image displays properly and is oval -->
        <h2  style="margin-right: 30%">${nome}</h2> <!-- Name below the image -->
        <div style="margin-left: 60%"> <p>Messaggio: ${testotemp}</p></div>
    </div>
</body>
</html>
 `;
    } else if (templateType === TemplateType.TEMPLATE4) {
      let base64Image = image1.split(";base64,").pop();
      fs.writeFile(
        `${dir}/image.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('https://www.marconisoftware.com/assets/04.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right; /* Align the text to the right */
            height: 100%; /* Ensure the container takes the full available height */
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start (left) */
            justify-content: center; /* Center items vertically */
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px; /* Adjust width as needed */
            height: 200px; /* Adjust height as needed */
            border-radius: 50%; /* Make the image oval */
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left; /* Align the title to the left */
            color: black; /* Set text color to black */
        }
        .slideshow-container p {
            text-align: right; /* Align the paragraph to the right */
            color: black; /* Set text color to black */
        }
        @media only screen and (max-width: 300px) {
            .slideshow-container h2, .slideshow-container p {
                font-size: 11px; /* Adjust font size for small screens */
            }
        }
    </style>
</head>
<body>
    <div class='slideshow-container'>
        <img src="image.png" alt="Image" style="border-radius: 30%;margin-right: 30%" > <!-- Ensure the image displays properly and is oval -->
        <h2  style="margin-right: 30%">${nome}</h2> <!-- Name below the image -->
        <div style="margin-left: 60%"> <p>Messaggio: ${testotemp}</p></div>
    </div>
</body>
</html>
 `;
    } else if (templateType === TemplateType.TEMPLATE5) {
      let base64Image = image1.split(";base64,").pop();
      fs.writeFile(
        `${dir}/image.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('https://www.marconisoftware.com/assets/05.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right; /* Align the text to the right */
            height: 100%; /* Ensure the container takes the full available height */
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start (left) */
            justify-content: center; /* Center items vertically */
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px; /* Adjust width as needed */
            height: 200px; /* Adjust height as needed */
            border-radius: 50%; /* Make the image oval */
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left; /* Align the title to the left */
            color: black; /* Set text color to black */
        }
        .slideshow-container p {
            text-align: right; /* Align the paragraph to the right */
            color: black; /* Set text color to black */
        }
        @media only screen and (max-width: 300px) {
            .slideshow-container h2, .slideshow-container p {
                font-size: 11px; /* Adjust font size for small screens */
            }
        }
    </style>
</head>
<body>
    <div class='slideshow-container'>
        <img src="image.png" alt="Image" style="border-radius: 30%;margin-right: 30%" > <!-- Ensure the image displays properly and is oval -->
        <h2  style="margin-right: 30%">${nome}</h2> <!-- Name below the image -->
        <div style="margin-left: 60%"> <p>Messaggio: ${testotemp}</p></div>
    </div>
</body>
</html>
 `;
    }
     else if (templateType === TemplateType.TEMPLATE6) {
      let base64Image = image1.split(";base64,").pop();
      fs.writeFile(
        `${dir}/image.png`,
        base64Image,
        { encoding: "base64" },
        function (err) {
          console.log(err);
        }
      );
      templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>1</title>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        html, body {
            height: 100%;
        }
        body {
            font-family: Verdana, sans-serif;
            background-image: url('https://www.marconisoftware.com/assets/06.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            min-height: 100%;
        }
        .slideshow-container {
            max-width: 400px;
            position: relative;
            margin: auto;
            text-align: right; /* Align the text to the right */
            height: 100%; /* Ensure the container takes the full available height */
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the start (left) */
            justify-content: center; /* Center items vertically */
        }
        .slideshow-container img {
            margin: 10px;
            width: 150px; /* Adjust width as needed */
            height: 200px; /* Adjust height as needed */
            border-radius: 50%; /* Make the image oval */
        }
        .slideshow-container h2 {
            margin-top: 10px;
            text-align: left; /* Align the title to the left */
            color: black; /* Set text color to black */
        }
        .slideshow-container p {
            text-align: right; /* Align the paragraph to the right */
            color: black; /* Set text color to black */
        }
        @media only screen and (max-width: 300px) {
            .slideshow-container h2, .slideshow-container p {
                font-size: 11px; /* Adjust font size for small screens */
            }
        }
    </style>
</head>
<body>
    <div class='slideshow-container'>
        <img src="image.png" alt="Image" style="border-radius: 30%;margin-right: 30%" > <!-- Ensure the image displays properly and is oval -->
        <h2  style="margin-right: 30%">${nome}</h2> <!-- Name below the image -->
        <div style="margin-left: 60%"> <p>Messaggio: ${testotemp}</p></div>
    </div>
</body>
</html>
 `;
    }
    if (templateHTML.length > 0) {
      fs.writeFile(`${dir}/index.html`, templateHTML, function (err) {
        if (err) throw err;
      });
    }
    return true;
  }
}

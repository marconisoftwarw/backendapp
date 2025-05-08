"use strict";
const nodemailer = require("nodemailer");

export enum UserType {
  SUPERUSER = "SUPERUSER",
  ADMIN = "ADMIN",
  ADMIN1 = "ADMIN1",
  UTENTE = "UTENTE",
}

export enum TemplateType {
  TEMPLATE1 = "TEMPLATE1",
  TEMPLATE2 = "TEMPLATE2",
  TEMPLATE3 = "TEMPLATE3",
  TEMPLATE4 = "TEMPLATE4",
  TEMPLATE5 = "TEMPLATE5",
  TEMPLATE6 = "TEMPLATE6",
  TEMPLATE7 = "TEMPLATE7",
  TEMPLATE8 = "TEMPLATE8",
  TEMPLATE9 = "TEMPLATE9",
  TEMPLATE10 = "TEMPLATE10",
}

/**
 * Send email
 * @param message
 * @param email
 * @param object
 * @param isHtml
 * @returns
 */
export async function sendEmail(message, email, object, isHtml) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtps.aruba.it",
      port: 465,
      secure: true,
      auth: {
        user: "noreply@memoryp.org",
        pass: "Fv7mQsJm%A@2022!",
      },
    });

    // Se message è vuoto, usa object
    const messageToSend = message ? message : object;

    // Log dei dati per debug
    console.log("Message:", messageToSend);
    console.log("Email:", email);

    // Genera il messaggio HTML solo se isHtml è true
    const htmlMessage = isHtml
      ? `
        <div style="
          position: relative;
          width: 400px;
          height: 400px;
          background-image: url('https://www.marconisoftware.com/images/email.png');
          background-size: cover;
          background-position: center;
          text-align: center;
          padding: 50px;
          background-color: transparent; /* Trasparente */
          display: flex; /* Usa flexbox per il centro */
          justify-content: center; /* Centra orizzontalmente */
          align-items: center; /* Centra verticalmente */
        ">
          <div style="
            position: relative;
            color: white;
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
          ">
            <p style="
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              font-family: Arial, sans-serif;
            ">${messageToSend}</p>

             <p style="
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              font-family: Arial, sans-serif;
            ">${email}</p>
              <p style="
              font-size: 16px;
              line-height: 1.5;
              margin: 0;
              font-family: Arial, sans-serif;
            ">${object}</p>
          </div>
        </div>`
      : messageToSend; // Usa solo il testo se non è HTML

    let info = await transporter.sendMail({
      from: '"Memoryp" <noreply@memoryp.org>',
      to: email,
      subject: object,
      text: isHtml ? undefined : messageToSend, // Testo in formato plain text
      html: isHtml ? htmlMessage : undefined, // HTML se isHtml è true
    });

    transporter.sendMail(info, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: " + info.response);
    });
  } catch (err) {
    console.log("Errore: " + err.toString());
    return false;
  }
  return true;
}

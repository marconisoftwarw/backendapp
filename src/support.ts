"use strict";
const nodemailer = require("nodemailer");

/**
 * Define userType
 */
export enum UserType {
  SUPERUSER = "SUPERUSER",
  ADMIN = "ADMIN",
  ADMIN1 = "ADMIN1",
  UTENTE = "UTENTE",
}
/**
 * Define of template user
 */
export enum TemplateType {
  TEMPLATE1 = "TEMPLATE1",
  TEMPLATE2 = "TEMPLATE2",
  TEMPLATE3 = "TEMPLATE3",
  TEMPLATE4 = "TEMPLATE4",
  TEMPLATE5 = "TEMPLATE5",
  TEMPLATE6 = "TEMPLATE6",
}

/**
 * Send email
 * @param message
 * @param email
 * @param object
 * @returns
 */
export async function sendEmail(message, email, object) {
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
    let info = await transporter.sendMail({
      from: '"Memoryp" <noreply@memoryp.org>',
      to: email,
      subject: object,
      text: message,
      html: message,
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

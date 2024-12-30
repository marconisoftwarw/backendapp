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

    // Check if isHtml is true to generate an HTML email with a background image
    const htmlMessage = isHtml
      ? `
        <div style="
          position: relative;
          width: 100%;
          height: 100%;
          background-image: url('https://www.marconisoftware.com/images/email.png');
          background-size: cover;
          background-position: center;
          text-align: center;
          padding: 50px;
        ">
          <div style="
            position: relative;
            color: white;
            background-color: rgba(0, 0, 0, 0.6);
            padding: 20px;
            border-radius: 10px;
            display: inline-block;
          ">
            <p style="
              font-size: 16px;
              line-height: 1.5;
              font-family: Arial, sans-serif;
              margin: 0;
            ">${message+"\nEmail: "+email}</p>
          </div>
        </div>`
      : message;

    let info = await transporter.sendMail({
      from: '"Memoryp" <noreply@memoryp.org>',
      to: email,
      subject: object,
      text: isHtml ? undefined : message, // Plain text if not HTML
      html: isHtml ? htmlMessage : undefined, // HTML if isHtml is true
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
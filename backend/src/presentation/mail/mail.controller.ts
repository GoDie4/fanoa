import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import { getEnvs } from "../../config/getEnvs";

// Usar process.cwd() para obtener la raíz del proyecto
const rootDir = process.cwd();
const uploadDir = path.join(rootDir, "src/mail");
const logFilePath = path.join(rootDir, "src", "error.log");

// Función para escribir en el log
const writeLog = (message: string) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, "utf8");
};

const transporter = nodemailer.createTransport({
  //@ts-ignore
  host: getEnvs().EMAIL_HOST,
  port: getEnvs().EMAIL_PORT,
  secure: false,
  auth: {
    user: getEnvs().EMAIL_USER,
    pass: getEnvs().EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = async (
  to: string | string[],
  subject: string,
  templateName: string,
  replacements: any
) => {
  try {
    const templatePath = path.join(uploadDir, templateName);
    console.log(`Ruta de la plantilla de correo: ${templatePath}`);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`La plantilla de correo no existe en: ${templatePath}`);
    }

    const source = fs.readFileSync(templatePath, "utf-8").toString();
    const template = Handlebars.compile(source);
    const htmlToSend = template(replacements);

    if (Array.isArray(to)) {
      to = to.join(", ");
    }

    await transporter.sendMail({
      from: getEnvs().EMAIL_USER,
      to,
      subject,
      html: htmlToSend,
    });

    writeLog(`Correo enviado a: ${to} | Asunto: ${subject}`);
    return true;
  } catch (error: any) {
    writeLog(
      `Error al enviar correo a: ${to} | Asunto: ${subject} | Detalle: ${error.message}`
    );
    console.error("Error enviando correo:", error);
    return false;
  }
};

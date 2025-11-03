import dotenv from "dotenv";
dotenv.config();

import { Bcrypt } from "../src/config/bcryp";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await Bcrypt.hash("GrupoFanoa@2025");

  await prisma.usuario.upsert({
    where: { email: "admin@grupofanoa.com" },
    update: {},
    create: {
      email: "admin@grupofanoa.com",
      contraseña: hashedPassword,
      nombre: "Administrador",
      rol: "ADMIN",
    },
  });

  console.log("✅ Usuario administrador creado correctamente");
}

main()
  .catch((e) => {
    console.error("❌ Error ejecutando seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

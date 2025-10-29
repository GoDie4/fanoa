import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "../generated/prisma/client";
import { Bcrypt } from "../src/config/bcryp";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await Bcrypt.hash("admin01");

  await prisma.usuario.upsert({
    where: { email: "admin01@gmail.com" },
    update: {},
    create: {
      email: "admin01@gmail.com",
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

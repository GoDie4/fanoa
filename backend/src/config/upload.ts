import multer from "multer";
import path from "path";
import fs from "fs";

// 🧩 Crea la carpeta si no existe
const ensureDirExists = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// 🧠 Determina la carpeta según la ruta del request
const getFolderByRoute = (req: any): string => {
  const originalUrl = req.originalUrl || "";
  if (originalUrl.includes("scategorias")) return "servicio_categoria";
  if (originalUrl.includes("sadicionales")) return "servicio_adicional";
  if (originalUrl.includes("sprincipal")) return "servicio_principal";
  if (originalUrl.includes("proyectos")) return "proyecto";
  if (originalUrl.includes("trabajo")) return "trabajo";
  if (originalUrl.includes("feria")) return "feria";
  if (originalUrl.includes("bsecundarios")) return "banners-secundarios";
  if (originalUrl.includes("bprincipales")) return "banners-principales";
  if (originalUrl.includes("contacto")) return "contacto";
  return "otros";
};

// 📦 Configuración general de almacenamiento
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const folder = getFolderByRoute(req);
    const uploadDir = path.resolve("uploads", folder);
    ensureDirExists(uploadDir);
    cb(null, uploadDir);
  },

  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({ storage });

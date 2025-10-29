import express, { Application, Router } from "express";
import cors from "cors";
import path from "path";

export const appServer = (port: string, routes: Router) => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const uploadsPath = path.resolve(__dirname, "../../uploads");
  app.use("/uploads", express.static(uploadsPath));
  app.use("/api/v1", routes);
  app.listen(port, () => {
    console.log(`Server running on port: ${port} 🚀`);
  });
};

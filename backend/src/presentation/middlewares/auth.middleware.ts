import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../config/jwt";
import { prisma } from "../../data";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid Bearer Token" });
  }

  const token = authorization.split(" ")[1] || "";

  try {
    const payload = await Jwt.verify<{ userId: string }>(token);
    if (!payload) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = await prisma.usuario.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { contraseña, ...restProperties } = user;

    (req as any).userId = restProperties.id;

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

import jwt, { SignOptions } from "jsonwebtoken";
import { getEnvs } from "./getEnvs";

const { JWT_SEED } = getEnvs();

export const Jwt = {
  sign: (payload: any, duration: string = "1d"): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration } as SignOptions, (error, encoded) => {
        if (error || !encoded) return reject(null);
        resolve(encoded);
      });
    });
  },

  verify: <T>(token: string): Promise<T | null> => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        if (error || !decoded) return reject(null);
        resolve(decoded as T);
      });
    });
  },
};

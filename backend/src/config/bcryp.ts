import { genSalt, hash, compare } from "bcryptjs";

export const Bcrypt = {
  hash: async (password: string): Promise<string> => {
    const salt = await genSalt();
    return await hash(password, salt);
  },

  compare: async (password: string, hashed: string): Promise<boolean> => {
    return await compare(password, hashed);
  },
};

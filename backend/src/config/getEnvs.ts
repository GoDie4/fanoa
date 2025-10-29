import "dotenv/config";

type ENVS = {
  TERM: string;
  SHELL: string;
  USER: string;
  PATH: string;
  PWD: string;
  EDITOR: string;
  SHLVL: string;
  HOME: string;
  LOGNAME: string;
  _: string;
  PORT: string;
  JWT_SEED: string;
};

export const getEnvs = (): ENVS => {
  return {
    ...(process.env as ENVS),
  };
};

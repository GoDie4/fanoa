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
  EMAIL_PORT: string;
  EMAIL_HOST: string;
  EMAIL_SECURE: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  EMAIL_RECEIVER: string;
  RECAPTCHA_SECRET_KEY: string
};

export const getEnvs = (): ENVS => {
  return {
    ...(process.env as ENVS),
  };
};

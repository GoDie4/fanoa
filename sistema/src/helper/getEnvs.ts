interface ENVS {
  [key: string]: any;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  SSR: boolean;
  VITE_API_URL: string;
  VITE_API_DEFAULT: string;
}

export const getEnvs = (): ENVS => {
  const envs = import.meta.env as ENVS;

  return {
    ...envs,
  };
};

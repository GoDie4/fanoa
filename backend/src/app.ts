import { getEnvs } from "./config/getEnvs";
import { appRouter } from "./presentation/app.routes";
import { appServer } from "./presentation/app.server";

const envs = getEnvs();

(() => {
  appServer(envs.PORT, appRouter());
})();

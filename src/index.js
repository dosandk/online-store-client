import "./config.js";

import { validateEnv } from "./validate-env.js";
import App from "./layout/app.js";
import router from "./router/index.js";

import productStore from "./storage/store.js";
import userStore from "./storage/user.js";

import alertsService from "./services/index.js";

import "./styles.scss";

validateEnv();

productStore.init();
userStore.init();
alertsService.init();

const app = new App({
  router,
});

const root = document.getElementById("root");

root.append(app.element);

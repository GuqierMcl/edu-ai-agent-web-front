import "./styles/reset.css";
import "virtual:uno.css";
import "animate.css/animate.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { setupRouter } from "./router";
import ElementPlusX from "vue-element-plus-x";

async function setupApp() {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(ElementPlusX);
  await setupRouter(app);
  app.mount("#app");
}

setupApp();
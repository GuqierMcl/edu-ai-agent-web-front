import "./styles/reset.css";
import "virtual:uno.css";
import "animate.css/animate.min.css";

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { setupRouter } from "./router";
//张力文 v0.1 v0.2 v0.3 v0.4 v0.5
async function setupApp() {
  const app = createApp(App);
  const pinia = createPinia();
  app.use(pinia);
  await setupRouter(app);
  app.mount("#app");
}

setupApp();
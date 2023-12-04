import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");

export const randomKey = (Math.floor(Math.random() * 90000) + 10000).toString();

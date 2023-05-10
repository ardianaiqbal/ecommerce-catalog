import { createApp } from "vue";
import "./assets/styles/page.css";
import App from "./App.vue";
import store from "./store/index.js";

createApp(App).use(store).mount("#app");

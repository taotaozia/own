import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/Base.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import locale from "element-plus/es/locale/lang/zh-cn";
// @ts-ignore
import store from "./store/index.js";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(store);
app.use(ElementPlus, { locale });
app.mount("#app");

import { createStore } from "vuex";
import test from "@/store/testModel";
import router from "@/store/routerData";
import user from "@/store/userData";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  modules: { test, router, user },
  plugins: [
    createPersistedState({
      key: "web-vuex-store",
      paths: ["user", "router"]
    })
  ]
});
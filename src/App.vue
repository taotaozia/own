<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import Cookies from "js-cookie";
import { getAdminByUUID, getRouters } from "@/api/http";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => {
  console.log("刷新页面");
  if (store.state.user.admin.id === 0) {
    const adminID = Cookies.get("adminID") ? Cookies.get("adminID") : "";
    if (adminID) {
      getAdminByUUID(adminID).then(res => {
        if (res.code === "200") {
          store.commit("setUser", res.data);
          console.log("数据丢失，重新请求");
        }
      });
    }
  }
  if (store.state.router.routers.length < 1 || store.state.router.menus.length < 1) {
    const adminID = Cookies.get("adminID") ? Cookies.get("adminID") : "";
    if (adminID) {
      getRouters("null").then(res => {
        if (res.code === "200") {
          store.commit("setRouters", res.data.routes);
          store.commit("setRouters", res.data.menus);
          console.log("数据丢失，重新请求");
        }
      });
    }
  }
});

// 解决问题
// ERROR ResizeObserver loop completed with undelivered notifications.
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 200);
    super(callback);
  }
};
</script>
<style scoped>

</style>
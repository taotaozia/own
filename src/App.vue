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
    getAdminByUUID(adminID).then(res => {
      if (res.code === "200") {
        store.commit("setUser", res.data);
        console.log("数据丢失，重新请求");
      }
    });
  }
  if (store.state.router.routers.length === 0) {
    const adminID = Cookies.get("adminID") ? Cookies.get("adminID") : "";
    getRouters(adminID).then(res => {
      if (res.code === "200") {
        store.commit("setRouters", res.data);
        console.log("数据丢失，重新请求");
      }
    });
  }
});

// // 解决ERROR ResizeObserver loop completed with undelivered notifications.
// //问题的
// const debounce = (fn, delay) => {
//   let timer = null;
//   return function() {
//     let context = this;
//     let args = arguments;
//     clearTimeout(timer);
//     timer = setTimeout(function() {
//       fn.apply(context, args);
//     }, delay);
//   };
// };
//
// // 解决ERROR ResizeObserver loop completed with undelivered notifications.
// //问题的
// const _ResizeObserver = window.ResizeObserver;
// window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
//   constructor(callback) {
//     callback = debounce(callback, 16);
//     super(callback);
//   }
// };

</script>
<style scoped>

</style>
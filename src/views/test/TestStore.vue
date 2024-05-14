<template>
  <el-card class="box-card">
    <template #header>
      <div><span>store 数据缓存 </span></div>
    </template>
    <span>{{ $store.state.user.admin.uuid }}</span>
    <br /><br />
    <span>{{ admin.value }}</span>
    <br /><br />
    <span>{{ adminID.value }}</span>


  </el-card>
</template>
<script setup>
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";
import { getRouters, postLogin } from "@/api/http";

const store = useStore();
let admin = reactive({});
let adminID = reactive({});
// onMounted(() => {
//   const loginuser = ref({ account: "admin", password: "123456" });
//   postLogin(JSON.stringify(loginuser.value.valueOf())).then(res => {
//     if (res.code === "200") {
//       console.log(res);
//       console.log(res.data);
//       store.commit("setUser", res.data);
//       admin.value = store.state.user.admin;
//       adminID.value = store.state.user.admin.uuid;
//       console.log(admin.value);
//       getRouters(adminID.value).then(ret => {
//         if (ret.code === "200") {
//           store.commit("setRouters", ret.data);
//         }
//       });
//     }
//   });
// });

</script>
<style></style>

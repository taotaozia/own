<template>
  <el-card class="box-card">
    <template #header>
      <div><span>路由</span></div>
    </template>

    <div>
      <template v-for="item in routers.value">
        <el-sub-menu
          :index="item.id"
          v-if="item.children && item.children.length >0 && item.children[0].menuType.toString() === '1'"
        >
          <template slot="title">
            <img :src="readIcon(item.icon)" height="20" width="20" style="margin-right: 10px" />
            <span>{{ item.menuName }}</span>
          </template>
        </el-sub-menu>
        <el-menu-item
          v-if="item.children && item.children.length >0 && item.children[0].menuType.toString() === '1'"
          :index="item.path"
          :key="item.id"
        >
          <span>{{ item.menuName }}</span>
        </el-menu-item>
      </template>
    </div>

  </el-card>
</template>
<script setup>
import { useStore } from "vuex";
import { onMounted, reactive, ref } from "vue";
import { getRouters, postLogin } from "@/api/http";

const store = useStore();
let admin = reactive({});
let adminID = reactive({});
let routers = reactive({});
onMounted(() => {
  const loginuser = ref({ account: "admin", password: "123456" });
  postLogin(JSON.stringify(loginuser.value.valueOf())).then(res => {
    if (res.code === "200") {
      store.commit("setUser", res.data);
      admin.value = store.state.user.admin;
      adminID.value = store.state.user.admin.uuid;
      console.log(admin.value);
      getRouters(adminID.value).then(ret => {
        if (ret.code === "200") {
          store.commit("setRouters", ret.data);
          routers.value = store.state.router.routers;
          console.log(routers.value);
        }
      });
    }
  });

});

const readIcon = (icon) => {
  return "../../assets/" + icon;
};


</script>
<style></style>

<template>
  <el-menu
    default-active="route"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="/home">
      <img src="../../assets/iconhome.png" height="20" width="20" style="margin-right: 10px" />
      <span>系统首页</span>
    </el-menu-item>
    <el-menu-item index="/company">
      <img src="../../assets/iconcompany.png" height="20" width="20" style="margin-right: 10px" />
      <span>公司资料</span>
    </el-menu-item>
    <el-sub-menu index="/product">
      <template #title>
        <img src="../../assets/iconproduct.png" height="20" width="20" style="margin-right: 10px" />
        <span>产品资源</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/product/agvcategory">移动机器人</el-menu-item>
        <el-menu-item index="/product/storagecategory">智能仓储</el-menu-item>
        <el-menu-item index="/product/jointcategory">关节机器人</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="/project">
      <template #title>
        <img src="../../assets/iconproject.png" height="20" width="20" style="margin-right: 10px" />
        <span>项目资源</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/project/agvsummary">移动机器人</el-menu-item>
        <el-menu-item index="/project/agvsummary">智能仓储</el-menu-item>
        <el-menu-item index="/project/agvsummary">关节机器人</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- 动态路由 -->
    <div v-for="menu in menusData">
      <el-sub-menu :index="menu.index">
        <template #title>
          <img :src="readIcon(menu.icon)" height="20" width="20" style="margin-right: 10px" />
          <span>{{ menu.label }}</span>
        </template>
        <el-menu-item-group v-for="item in menu.children">
          <el-menu-item :index="item.index"><span>{{ item.label }}</span></el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </div>

  </el-menu>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const menusData = ref({});
onMounted(() => {
  menusData.value = store.state.router.menus;
  console.log("添加导航完成");
});
const readIcon = (icon) => {
  return require("@/assets/" + icon);
};
</script>

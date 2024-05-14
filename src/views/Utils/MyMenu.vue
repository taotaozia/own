<template>
  <!-- default-active 刷新之后跳转到首页 -->
  <el-menu
    default-active="route"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <!--<li v-for="(v,i) in "></li>-->
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
        <el-menu-item index="/product/storecategory">智能仓储</el-menu-item>
        <el-menu-item index="/product/shutcategory">关节机器人</el-menu-item>
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
    <el-sub-menu index="/edit">
      <template #title>
        <img src="../../assets/iconedit.png" height="20" width="20" style="margin-right: 10px" />
        <span>编辑</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/userData">个人资料</el-menu-item>
        <i v-for="(router,index) in routerData" :key="index">
          <i v-if="router.routerMenuFlag === '是'">
            <el-menu-item :index="router.routerMenuIndex"><span>{{ router.routerTitle }}</span></el-menu-item>
          </i>
        </i>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const routerData = ref({});
onMounted(() => {
  routerData.value = store.state.router.routers;
});

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">路由权限添加</span></div>
    </template>
    <div class="table">
      <el-form :model="navrouter" label-width="auto" style="max-width: 600px">
        <el-form-item label="父级ID">
          <el-input v-model="navrouter.parentID" placeholder="上级路由ID" disabled />
        </el-form-item>
        <el-form-item label="父级名称">
          <el-select v-model="navrouter.parentName" @change="changeID">
            <el-option v-for="item in routers.value" :label="item.routerTitle" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="导航描述">
          <el-input v-model="navrouter.routerTitle" placeholder="左侧显示的名称" />
        </el-form-item>
        <el-form-item label="导航图标">
          <el-input v-model="navrouter.routerIcon" placeholder="assets下的图片，直接写图片名称 带后缀.png" />
        </el-form-item>
        <el-form-item label="导航窗口是否显示">
          <el-radio-group v-model="navrouter.routerMenuFlag">
            <el-radio value="是">是</el-radio>
            <el-radio value="否">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="导航窗格跳转路由">
          <el-input v-model="navrouter.routerMenuIndex" placeholder="/edit/。。。" />
        </el-form-item>
        <el-form-item label="路由所属路由">
          <el-input v-model="navrouter.routerParent" placeholder="index在哪个的children下" />
        </el-form-item>
        <el-form-item label="路由名称">
          <el-input v-model="navrouter.routerName" placeholder="index--name" />
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="navrouter.routerPath" placeholder="index--path" />
        </el-form-item>
        <el-form-item label="路由文件位置">
          <el-input v-model="navrouter.routerComponent" placeholder="vue文件位置，@/views/。。。" />
        </el-form-item>


        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/navrouter')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { getRouterList, postAddRouter } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();
let navrouter = ref({
  id: 0,
  uuid: "",
  require1: "",
  parentID: 0,
  parentName: "",
  routerMenuFlag: "",
  routerMenuIndex: "",
  routerTitle: "",
  routerIcon: "",
  routerParent: "",
  routerName: "",
  routerPath: "",
  routerComponent: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});

const routers = reactive([]);
onMounted(() => {
  getRouterList().then(res => {
    if (res.code === "200") {
      routers.value = res.data;
    }
  });
});
const changeID = (row) => {
  navrouter.value.parentID = row.id;
  navrouter.value.parentName = row.routerTitle;
};
const onSubmit = async () => {
  console.log(JSON.stringify(navrouter.value.valueOf()));
  postAddRouter(JSON.stringify(navrouter.value.valueOf())).then((res) => {
    if (res.code === "200") {
      ElMessage.success("更新成功");
      tiaozhuan.push("/edit/navrouter");
    } else {
      ElMessage.error("更新失败检查错误");
    }
  });
};

</script>

<style scoped>


.button {
  padding-left: 200px;
}
</style>
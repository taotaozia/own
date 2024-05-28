<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新权限路由</span></div>
    </template>
    <div class="table">
      <el-form :model="navrouter" label-width="auto" style="max-width: 600px">
        <el-form-item label="父级ID">
          <el-input v-model="navrouter.parentID" disabled />
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
          <el-input v-model="navrouter.routerIcon" placeholder="图片地址，暂时没有用到" />
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
import { useRouter } from "vue-router";
import { getRouter, getRouterList, putUpdateRouter } from "@/api/http";

const tiaozhuan = useRouter();
let navrouter = ref({});
const routers = reactive([]);
onMounted(() => {
  const id = localStorage.getItem("/edit/updaterouter");
  getRouter(id).then((res) => {
    if (res.code === "200") {
      navrouter.value = res.data;
    }
  });
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

const onSubmit = () => {
  console.log(JSON.stringify(navrouter.value.valueOf()));
  putUpdateRouter(JSON.stringify(navrouter.value.valueOf())).then((res) => {
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

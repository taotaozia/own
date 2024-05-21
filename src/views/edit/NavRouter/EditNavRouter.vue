<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑权限路由</span></div>
    </template>
    <div>
    <el-table :data="TableData.value" style="width: 100%;height: 500px">
      <el-table-column fixed="left" type="index" label="序号" width="60" />
      <el-table-column prop="require1" label="条件1" width="100"/>
      <el-table-column prop="require2" label="条件2" />
      <el-table-column prop="require3" label="条件3" />
      <el-table-column prop="routerMenuFlag" label="导航窗口是否显示" />
      <el-table-column prop="routerMenuIndex" label="导航窗格跳转路由" width="150"/>
      <el-table-column prop="routerTitle" label="导航描述" width="150"/>
      <el-table-column prop="routerIcon" label="导航图标" />
      <el-table-column prop="routerParent" label="路由所属路由" />
      <el-table-column prop="routerName" label="路由名称" width="150"/>
      <el-table-column prop="routerPath" label="路由路径" width="150"/>
      <el-table-column prop="routerComponent" label="路由文件位置" width="250"/>

      <el-table-column prop="updatetime" label="更新时间" width="200" />
      <el-table-column fixed="right" width="150">
        <template #header>
          <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addrouter')">
            添加
          </el-button>
        </template>
        <template #default="scope">
          <el-button size="small"
                     @click="tiaozhuan.push({ path: '/edit/updaterouter', query: { id: scope.row.id } })">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </el-card>
</template>

<script setup>
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import { markRaw, onMounted, reactive } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { deleteRouter, getRouterList } from "@/api/http";

const tiaozhuan = useRouter();
const TableData = reactive([]);
onMounted(() => {
  loadData();
});
const loadData = () => {
  getRouterList().then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.routerTitle + " 路由信息?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteRouter(row.id).then((res) => {
        if (res.code === "200") {
          ElMessage.success("删除成功");
          loadData();
        } else {
          ElMessage.error("删除失败，请联系管理员");
        }
      });
    })
    .catch(() => {
      ElMessage.info("取消成功");
    });
};

</script>

<style>

</style>
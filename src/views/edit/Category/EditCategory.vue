<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑产品类型</span></div>
    </template>
    <div>
    <el-table :data="TableData.value" style="width: 100%;height: 500px">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="classify" label="产品所属" width="100" />
      <el-table-column prop="categoryName" label="类型名称" width="100" />
      <el-table-column prop="picture" label="图片" width="150" />
      <el-table-column prop="categoryDescription" label="描述" />
      <el-table-column prop="pictureUrl" label="展示图片" />
      <el-table-column prop="updatetime" label="更新时间" width="200" />
      <el-table-column width="150">
        <template #header>
          <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addCategory')">
            添加
          </el-button>
        </template>
        <template #default="scope">
          <el-button size="small"
                     @click="tiaozhuan.push({ path: '/edit/updateCategory', query: { id: scope.row.id } })">
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
import request from "@/api/request";
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { deleteCategory, getCategory, getCategorys } from "@/api/http";

const tiaozhuan = useRouter();
const TableData = reactive([]);
onMounted(() => {
  loadData();
});
const loadData = () => {
  getCategorys().then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.categoryName + " 产品类别?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteCategory(row.id).then((res) => {
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
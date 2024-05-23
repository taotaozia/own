<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑下载内容</span></div>
    </template>
    <div>
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column fixed="left" type="index" label="序号" width="60" />
        <el-table-column prop="productName" label="关联产品" width="120" />
        <el-table-column prop="downloadType" label="文件类型" width="120" />
        <el-table-column prop="downloadName" label="名称" width="200" />
        <el-table-column prop="fileName" label="文件名" width="400" />
        <el-table-column prop="downloadUrl" label="读取地址" width="400" />
        <el-table-column prop="updatetime" label="更新时间" width="200" />
        <el-table-column fixed="right" width="150">
          <template #header>
            <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addDownload')">
              添加
            </el-button>
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleUpdate(scope.row)">编辑</el-button>
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
import { deleteDownload, getDownloads } from "@/api/http";

const tiaozhuan = useRouter();
const TableData = reactive([]);
onMounted(() => {
  loadData();
});
const loadData = () => {
  getDownloads().then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.productName + " 下载内容?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteDownload(row.id).then((res) => {
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
const handleUpdate = (row) => {
  localStorage.setItem("/edit/updateDownload", row.id);
  tiaozhuan.push("/edit/updateDownload");
};

</script>

<style>

</style>
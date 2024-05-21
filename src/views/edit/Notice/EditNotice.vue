<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑系统消息</span></div>
    </template>
    <div class="table">
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="userid" label="用户" width="100" />
        <el-table-column prop="finish" label="是否完成" width="60" />
        <el-table-column prop="title" label="系统消息名称" width="200" />
        <el-table-column prop="noticeText" label="系统消息内容" />
        <el-table-column prop="updatetime" label="发布时间" width="200" />
        <el-table-column width="150">
          <template #header>
            <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addNotice')">
              添加
            </el-button>
          </template>
          <template #default="scope">
            <el-button size="small"
                       @click="tiaozhuan.push({ path: '/edit/updateNotice', query: { id: scope.row.id } })">
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
import { markRaw, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { deleteNotice, getNotices } from "@/api/http";

const tiaozhuan = useRouter();
const TableData = reactive([]);

onMounted(() => {
  loadData();
});
const loadData = () => {
  getNotices().then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.title + " 系统消息?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteNotice(row.id).then((res) => {
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
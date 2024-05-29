<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑产品详情页</span></div>
    </template>
    <div>
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column fixed="left" type="index" label="序号" width="60" />
        <el-table-column prop="classify" label="类型" width="100" />
        <el-table-column prop="detailName" label="名称" width="200" />
        <el-table-column prop="leftimg" label="左视图" />
        <el-table-column prop="mainimg" label="主视图" />
        <el-table-column prop="rightimg" label="右视图" />
        <el-table-column prop="updatetime" label="更新时间" width="200" />


        <el-table-column fixed="right" width="150">
          <template #header>
            <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addDetail')">
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
import { useRouter } from "vue-router";
import { Delete } from "@element-plus/icons-vue";
import { deleteDetail, getDetails } from "@/api/http";
import { useStore } from "vuex";

const tiaozhuan = useRouter();
const TableData = reactive([]);
const store = useStore();
onMounted(() => {
  loadData();
});
const loadData = () => {
  getDetails(store.state.user.admin.classify).then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleUpdate = (row) => {
  localStorage.setItem("/edit/updateDetail", row.id);
  tiaozhuan.push("/edit/updateDetail");
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.detailName + " 详情页?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteDetail(row.id).then((res) => {
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
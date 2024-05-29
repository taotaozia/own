<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑用户</span></div>
    </template>
    <div class="table">
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column fixed="left" type="index" label="序号" width="60" />
        <!--      <el-table-column prop="uuid" label="uudi" width="180" />-->
        <el-table-column prop="adminID" label="工号" width="130"/>
        <el-table-column prop="name" label="姓名" width="130"/>
        <el-table-column prop="identity" label="身份" width="120"/>
        <el-table-column prop="classify" label="标识" width="100"/>
        <el-table-column prop="faculty" label="一级部门" width="150"/>
        <el-table-column prop="department" label="二级部门" width="150"/>
        <el-table-column prop="post" label="岗位身份" width="150"/>
        <el-table-column prop="updatetime" label="更新时间" width="200" />
        <el-table-column fixed="right" width="150">
          <template #header>
            <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addUser')">
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
import { markRaw, onMounted, reactive } from "vue";
import { ElMessage, ElMessageBox, ElTable } from "element-plus";
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { deleteAdmin, getAdmins } from "@/api/http";
import { useStore } from "vuex";

const store = useStore();
const tiaozhuan = useRouter();
const TableData = reactive([]);

onMounted(() => {
  loadData();
});
const loadData = () => {
  getAdmins(store.state.user.admin.uuid).then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.name + " 用户?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteAdmin(row.id).then((res) => {
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
  localStorage.setItem("/edit/updateUser", row.id);
  tiaozhuan.push("/edit/updateUser");
};

</script>

<style>

</style>
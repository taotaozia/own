<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">角色管理</span></div>
    </template>
    <div>
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column fixed="left" type="index" label="序号" width="60" />
        <el-table-column prop="roleName" label="角色名称" width="200" />
        <el-table-column prop="routerID" label="角色路由" />
        <el-table-column prop="updatetime" label="更新时间" width="200" />

        <el-table-column fixed="right" width="150">
          <template #header>
            <el-button type="warning" :icon="Plus" size="small" @click="tiaozhuan.push('/edit/addRole')">
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
import { deleteRole, getRoles } from "@/api/http";
import { Delete, Plus } from "@element-plus/icons-vue";

const tiaozhuan = useRouter();
const TableData = reactive([]);
onMounted(() => {
  loadData();
});
const loadData = () => {
  getRoles().then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.roleName + " 角色?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteRole(row.id).then((res) => {
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
  localStorage.setItem("/edit/updateRole", row.id);
  tiaozhuan.push("/edit/updateRole");
};
</script>
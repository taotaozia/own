<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">关节机器人产品</span></div>
    </template>
    <div>
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column fixed="left" type="index" label="序号" width="60" />
        <el-table-column prop="categoryName" label="关联产品" width="200" />
        <el-table-column prop="detailName" label="关联详情页" width="200" />
        <el-table-column prop="jointName" label="产品名称" width="150" />
        <el-table-column prop="updatetime" label="更新时间" width="200" />
        <el-table-column prop="jointBOM" label="物料编号" width="150" />
        <el-table-column prop="jointDirector" label="负责人" width="100" />

        <el-table-column prop="jointType" label="类型编号" width="120" />
        <el-table-column prop="jointLoad" label="载重" width="80" />
        <el-table-column prop="jointArm" label="臂展" width="100" />
        <el-table-column prop="jointAxis" label="轴数" width="60" />
        <el-table-column prop="jointIPcode" label="IP等级" width="80" />
        <el-table-column prop="jointIndustry" label="行业标准" width="100" />

        <el-table-column fixed="right" width="150">
          <template #header>
            <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addJoint')">
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
import { Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { deleteJoint, getJoints } from "@/api/http";

const tiaozhuan = useRouter();
const TableData = reactive([]);
onMounted(() => {
  loadData();
});
const loadData = () => {
  getJoints().then((res) => {
    if (res.code === "200") {
      console.log(res.data);
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.jointType + " 产品?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteJoint(row.id).then((res) => {
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
  localStorage.setItem("/edit/updateJoint", row.id);
  tiaozhuan.push("/edit/updateJoint");
};
</script>

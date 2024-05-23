<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">编辑产品</span></div>
    </template>
    <div>
      <el-table :data="TableData.value" style="width: 100%;height: 500px">
        <el-table-column fixed="left" type="index" label="序号" width="60" />
        <!--      <el-table-column prop="productId" label="产品编号" />-->
        <el-table-column prop="categoryName" label="关联产品" width="100" />
        <el-table-column prop="detailName" label="关联详情页" width="200" />
        <el-table-column prop="productName" label="车辆名称" width="150" />
        <el-table-column prop="updatetime" label="更新时间" width="200" />
        <el-table-column prop="productBOM" label="物料编号" width="150" />
        <el-table-column prop="productDirector" label="负责人" width="100" />

        <el-table-column prop="productType" label="类型编号" width="120" />
        <el-table-column prop="productLoad" label="载重" width="60" />
        <el-table-column prop="productModel" label="车型" width="100" />
        <el-table-column prop="productControl" label="控制器" width="80" />
        <el-table-column prop="productDrive" label="导航方式" width="150" />
        <el-table-column prop="productChassis" label="底盘" width="100" />

        <el-table-column fixed="right" width="150">
          <template #header>
            <el-button type="warning" icon="Plus" size="small" @click="tiaozhuan.push('/edit/addProduct')">
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
import { deleteProduct, getProducts } from "@/api/http";

const tiaozhuan = useRouter();
const TableData = reactive([]);
onMounted(() => {
  loadData();
});
const loadData = () => {
  getProducts().then((res) => {
    if (res.code === "200") {
      TableData.value = res.data;
    }
  });
};
const handleDelete = (row) => {
  ElMessageBox.confirm("是否确认删除 " + row.productType + " 产品?",
    { confirmButtonText: "确认", cancelButtonText: "取消", type: "warning", icon: markRaw(Delete) })
    .then(() => {
      deleteProduct(row.id).then((res) => {
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
  localStorage.setItem("/edit/updateProduct", row.id);
  tiaozhuan.push("/edit/updateProduct");
};
</script>

<style>

</style>
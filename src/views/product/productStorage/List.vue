<template>
  <div class="table">
    <el-table
      :data="tableData.value"
      border
      style="width: 100%"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" width="50" />
      <el-table-column prop="storageName" label="产品名称" />
      <el-table-column prop="storageType" label="产品型号" />
      <el-table-column prop="storageDirector" label="产品负责人" />
      <el-table-column>
        <template v-slot="tableData">
          <el-tooltip effect="light" content="查看详情">
            <el-button :icon="ZoomIn" type="primary" @click="lookdetail(tableData.row)" />
          </el-tooltip>
          <el-tooltip effect="light" content="资源下载">
            <el-button :icon="Download" type="warning" style="margin-left: 5px" @click="lookDownload(tableData.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { ElTable } from "element-plus";
import { useRouter } from "vue-router";
import { getStorageList } from "@/api/http";
import { Download, ZoomIn } from "@element-plus/icons-vue/global";

const tiaozhuan = useRouter();
const tableData = reactive([]);

//初始化方法
onMounted(() => {
  let CUID = localStorage.getItem("/product/storagelist");
  if (CUID){
    getStorageList(CUID).then(res => {
      if (res.code === "200") {
        tableData.value = res.data;
      }
    });
  }
});
//函数
const lookdetail = (row) => {
  if (row.valueOf().detailID !== "") {
    localStorage.setItem("/product/details", row.valueOf().detailID);
    tiaozhuan.push("/product/details");
  } else {
    ElMessage.error("该产品没有详情页，请联系管理员添加");
  }
};
const lookDownload = (row) => {
  localStorage.setItem("/product/downloads", row.valueOf().storageId);
  tiaozhuan.push("/product/downloads");
};


</script>

<style lang="less" scoped>
.table {
  width: 83vw;
  max-height: 85vh;
  margin-top: 3vh;
}
</style>

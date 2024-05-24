<template>
  <div class="table">
    <el-table
      :data="tableData.value"
      border
      style="width: 100%"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" width="50" />
      <el-table-column prop="jointType" label="产品型号" />
      <el-table-column v-if="flag" prop="jointArm" label="臂展（mm）" />
      <el-table-column v-if="flag" prop="jointLoad" label="臂展（kg）" />
      <el-table-column v-if="flag" prop="jointAxis" label="轴数" />
      <el-table-column v-if="flag" prop="jointIndustry" label="应用行业" />
      <el-table-column prop="jointIPcode" label="防护等级" />
      <el-table-column prop="jointDirector" label="产品负责人" />
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
import { onMounted, reactive, ref } from "vue";
import { ElTable } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { Download, ZoomIn } from "@element-plus/icons-vue/global";
import { getJointList } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();
//变量
const tableData = reactive([]);
const flag = ref(true);
//初始化方法
onMounted(() => {
  let CUID = localStorage.getItem("/product/jointlist");
  getJointList(CUID).then(res => {
    if (res.code === "200") {
      tableData.value = res.data;
      if (tableData.value.length > 0 && !tableData.value[0].jointArm) {
        flag.value = false;
      }
    }
  });
});

//函数
const lookdetail = (row) => {
  if (row.valueOf().detailID !== "") {
    localStorage.setItem("/product/jointdetails", row.valueOf().detailID);
    tiaozhuan.push("/product/jointdetails");
  } else {
    ElMessage.error("该产品没有详情页，请联系管理员添加");
  }
};
const lookDownload = (row) => {
  localStorage.setItem("/product/jointdownloads", row.valueOf().detailID);
  tiaozhuan.push("/product/jointdownloads");
};


</script>

<style lang="less" scoped>
.table {
  width: 83vw;
  max-height: 85vh;
  margin-top: 3vh;
}

</style>

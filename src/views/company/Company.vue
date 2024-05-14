<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">公司资料 -- 文件下载</span></div>
    </template>
    <div class="table" v-loading="loading">
      <el-table :data="downloadData.value" border style="width: 100%;height: 70vh">
        <el-table-column type="index" label="序号" width="60" />
        <!--        <el-table-column label="类型" prop="downloadType" width="150" />-->
        <el-table-column label="名称" prop="downloadName" width="300" />
        <el-table-column label="文件名" prop="fileName" />
        <el-table-column prop="updatetime" label="更新时间" width="200" />
        <el-table-column label="下载" width="100px">
          <template #default="scope">
            <el-button type="primary" round @click="download(scope.row)">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>


</template>

<script setup>
import { ElTable } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCompany, getDownload, getDownloadTable } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();
let downloadData = reactive([]);
let loading = ref(false);
onMounted(() => {
  getCompany().then(ret => {
    if (ret.code === "200") {
      let PUID = ret.data.productId;
      getDownloadTable(PUID).then((res) => {
        if (res.code === "200") {
          downloadData.value = res.data;
        }
      });
    }
  });
});

const download = (row) => {
  ElMessage.warning("下载中，请勿操作");
  loading.value = true;
  getDownload(row.id).then(res => {
    if (res.status === 200) {
      const link = document.createElement("a");
      let blob = new Blob([res.data]);
      if (blob.size === 0) {
        ElMessage.error("系统错误：文件不存在，请联系管理员");
        return;
      }
      //文件名，中文无法解析的时候会显示 _(下划线),生产环境获取不到
      let fileName = row.fileName;
      link.style.display = "none";
      // 兼容不同浏览器的URL对象
      const url = window.URL || window.webkitURL;
      link.href = url.createObjectURL(blob);
      link.setAttribute("download", fileName.substring(fileName.lastIndexOf("_") + 1));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      url.revokeObjectURL(link.href);//销毁url对象
      loading.value = false;
      ElMessage.success("下载成功，请在下载内容中查看");
    } else {
      ElMessage.error("系统错误：请联系管理员！");
    }
  });
};
</script>

<style>

</style>

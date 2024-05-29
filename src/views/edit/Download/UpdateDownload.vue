<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新下载内容</span></div>
    </template>
    <div class="table">
      <el-form :inline=true :model="download" label-width="auto" style="max-width: 85vw">
        <el-form-item label="关联产品">
          <el-select clearable v-model="download.productName" style="width: 250px">
            <el-option
              v-for="item in productSelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-autocomplete
            v-model="download.downloadName"
            :fetch-suggestions="nameSearch"
            clearable
            style="width: 250px" />
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select v-model="download.downloadType" style="width: 250px">
            <el-option label="公司资料文件" value="公司资料文件" />
            <el-option label="图片" value="图片" />
            <el-option label="产品宣传页" value="产品宣传页" />
            <el-option label="二维图纸" value="二维图纸" />
            <el-option label="三维模型" value="三维模型" />
          </el-select>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input disabled v-model="download.fileName" style="width: 600px" />
        </el-form-item>
        <el-form-item label="文件位置">
          <el-input disabled v-model="download.downloadUrl" style="width: 600px" />
        </el-form-item>
        <el-tabs class="demo-tabs">
          <el-tab-pane label="上传文件" name="first">
            <el-upload
              ref="upload"
              class="uploadPicture"
              action=""
              :limit="1"
              :http-request="uploadFile"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed">
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="选择复制" name="second">
            <el-table :data="TableData.value" style="width: 500px;height: 200px">
              <el-table-column prop="fileName" width="400" />
              <el-table-column>
                <template #default="scope">
                  <el-button size="small" @click="handleCopyFile(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/download')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </el-card>

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { getDownloads, getDownloadSelect, getDownloadSQL, postUploadOne, putUpdateDownload } from "@/api/http";
import { ElLoading, ElTable } from "element-plus";
import { useStore } from "vuex";

const tiaozhuan = useRouter();

let download = ref({});
const productSelects = reactive([]);
const TableData = reactive([]);
const store = useStore();
onMounted(() => {
  const id = localStorage.getItem("/edit/updateDownload");
  if (id) {
    getDownloadSQL(id).then((res) => {
      if (res.code === "200") {
        download.value = res.data;
      }
    });
    getDownloadSelect(store.state.user.admin.classify).then((res) => {
      if (res.code === "200") {
        selectvalue(res.data, productSelects);
      }
    });
    getDownloads(store.state.user.admin.classify).then((res) => {
      if (res.code === "200") {
        TableData.value = res.data;
      }
    });
  } else {
    tiaozhuan.push("/edit/download");
  }

});
const selectvalue = (datavalue, select) => {
  for (let i = 0; i < datavalue.length; i++) {
    select[i] = { id: i + 1, value: datavalue[i] };
  }
};

const nameSelect = ref([{ value: "产品 - 产品宣传页" }, { value: "产品 - 二维图纸" }, { value: "产品 - 三维模型" }, { value: "产品 - 渲染图" }]);
const nameSearch = (queryString, cb) => {
  const results = queryString ? nameSelect.value.filter(createFilter(queryString)) : nameSelect.value;
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
};
const handleCopyFile = (row) => {
  download.value.fileName = row.fileName;
  download.value.downloadUrl = row.downloadUrl;
};
// 上传文件的功能
let file = reactive({});
let haveFile = ref(false);
const handleExceed = () => {
  ElMessage.warning("只能上传一个文件，请删除后选择重新选择！");
};
// 文件上传之前的判断限制
const beforeUpload = (file) => {
  const isSize = file.size / 1024 / 1024 <= 50;
  if (!isSize) {
    ElMessage.warning("上传文件的大小不能超过50MB，大文件上传请联系管理员");
  }
  return isSize;
};
// 自定义上传方法定义
const uploadFile = (val) => {
  file = val.file;
  haveFile.value = true;
};
const updateDownload = () => {
  console.log(JSON.stringify(download.value.valueOf()));
  putUpdateDownload(JSON.stringify(download.value.valueOf())).then((res) => {
    if (res.code === "200") {
      ElMessage.success("修改成功");
      tiaozhuan.push("/edit/download");
    } else {
      ElMessage.error("更新失败，请联系管理员");
    }
  });
};
const onSubmit = () => {
  if (haveFile.value) {
    const loading = ElLoading.service({
      lock: true,
      text: "上传中...",
      background: "rgba(0, 0, 0, 0.7)"
    });
    let formData = new FormData();
    formData.append("downloadType", download.value.downloadType);
    formData.append("file", file);
    postUploadOne(formData).then(fRes => {
      let fileRes = fRes.data;
      if (fileRes.code === "200") {
        download.value.downloadUrl = fileRes.data;
        download.value.fileName = fileRes.data.split("\\").pop();
        updateDownload();
      } else {
        ElMessage.error(fileRes.msg);
      }
      loading.close();
    });
  } else {
    updateDownload();
    loading.close();
  }
};
</script>

<style scoped>

.button {
  margin-top: 10px;
  padding-left: 200px;
}
</style>
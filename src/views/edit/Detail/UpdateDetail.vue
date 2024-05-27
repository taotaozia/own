<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新产品详情页</span></div>
    </template>
    <div class="table">
      <el-form :inline="true" :model="detail" label-width="auto" style="max-width: 100%">
        <!--      <el-form-item label="唯一标识"><el-input v-model="detail.detailID" disabled /></el-form-item>-->
        <el-form-item label="左视图">
          <el-upload
            ref="upload"
            class="uploadPicture"
            action=""
            :limit="1"
            accept=".png"
            :http-request="leftUploadFile"
            :before-upload="beforUPload"
            :on-exceed="handleExceed"
            style="width: 100px">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="主视图">
          <el-upload
            ref="upload"
            class="uploadPicture"
            action=""
            :limit="1"
            accept=".png"
            :http-request="mainUploadFile"
            :before-upload="beforUPload"
            :on-exceed="handleExceed"
            style="width: 100px">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="右视图">
          <el-upload
            ref="upload"
            class="uploadPicture"
            action=""
            :limit="1"
            accept=".png"
            :http-request="rightUploadFile"
            :before-upload="beforUPload"
            :on-exceed="handleExceed"
            style="width: 100px">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情页名称">
          <el-input v-model="detail.detailName" />
        </el-form-item>
        <el-form-item label="类型" style="margin-left: -50px">
          <el-select v-model="detail.classify" style="width: 200px">
            <el-option label="移动机器人" value="移动机器人" />
            <el-option label="智能仓储" value="智能仓储" />
            <el-option label="关节机器人" value="关节机器人" />
          </el-select>
        </el-form-item>
        <el-table :data="detail.paramList" style="width: 100%;height: 400px">
          <el-table-column fixed="left" type="index" width="85">
            <template #header>
              序号
              <el-button type="primary" size="small" @click="addParams" circle>
                <el-icon>
                  <Plus />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column type="type" label="类型">
            <template #default="scope">
              <el-input v-model="scope.row.type" />
            </template>
          </el-table-column>
          <el-table-column type="head" label="名称">
            <template #default="scope">
              <el-input v-model="scope.row.head" />
            </template>
          </el-table-column>
          <el-table-column type="contents" label="数值">
            <template #default="scope">
              <el-input v-model="scope.row.contents" />
            </template>
          </el-table-column>

        </el-table>

        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/detail')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetail, postUploadMul, putUpdateDetail } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();

let detail = ref({});
onMounted(() => {
  const id = localStorage.getItem("/edit/updateDetail");
  if (id) {
    getDetail(id).then(res => {
      if (res.code === "200") {
        detail.value = res.data;
      }
    });
  }
});

const addParams = () => {
  detail.value.paramList.push(
    { id: 0, duid: "", type: "", head: "", contents: "" },
    { id: 0, duid: "", type: "", head: "", contents: "" },
    { id: 0, duid: "", type: "", head: "", contents: "" },
    { id: 0, duid: "", type: "", head: "", contents: "" },
    { id: 0, duid: "", type: "", head: "", contents: "" });
};
// 上传文件的功能
let leftFile = ref(null);
let mainFile = ref(null);
let rightFile = ref(null);
const handleExceed = () => {
  ElMessage.warning("只能上传一个文件，请删除后选择重新选择！");
};
// 文件上传之前的判断限制
const beforUPload = (file) => {
  const isSize = file.size / 1024 / 1024 <= 50;
  if (!isSize) {
    ElMessage.warning("上传文件的大小不能超过50MB，大文件上传请联系管理员");
  }
  return isSize;
};
// 自定义上传方法定义
const leftUploadFile = (val) => {
  leftFile = val.file;
};
const mainUploadFile = (val) => {
  mainFile = val.file;
};
const rightUploadFile = (val) => {
  rightFile = val.file;
};
const onSubmit = () => {
  let formData = new FormData();
  let flag = ref(false);
  if (leftFile.value !== null) {
    formData.append("left", leftFile);
    flag.value = true;
  }
  if (mainFile.value !== null) {
    formData.append("main", mainFile);
    flag.value = true;
  }
  if (rightFile.value !== null) {
    formData.append("right", rightFile);
    flag.value = true;
  }
  if (flag.value) {
    postUploadMul(formData).then(fRes => {
      let fileRes = fRes.data;
      if (fileRes.code === "200") {
        if (leftFile.value !== null) {
          detail.value.leftimg = fileRes.data.left.split("\\").pop();
          detail.value.leftimgUrl = fileRes.data.left;
        }
        if (mainFile.value !== null) {
          detail.value.mainimg = fileRes.data.main.split("\\").pop();
          detail.value.mainimgUrl = fileRes.data.main;
        }
        if (rightFile.value !== null) {
          detail.value.rightimg = fileRes.data.right.split("\\").pop();
          detail.value.rightimgUrl = fileRes.data.right;
        }
        putUpdateDetail(JSON.stringify(detail.value.valueOf())).then((res) => {
          if (res.code === "200") {
            ElMessage.success("修改成功");
            tiaozhuan.push("/edit/detail");
          } else {
            ElMessage.error("更新失败，请联系管理员");
          }
        });
      } else {
        ElMessage.error(fileRes.msg);
      }
    });
  } else {
    putUpdateDetail(JSON.stringify(detail.value.valueOf())).then((res) => {
      if (res.code === "200") {
        ElMessage.success("修改成功");
        tiaozhuan.push("/edit/detail");
      } else {
        ElMessage.error("更新失败，请联系管理员");
      }
    });
  }

};
</script>

<style scoped>
.button {
  padding-left: 200px;
}
</style>
<template>
  <el-upload
    ref="upload"
    class="uploadPicture"
    action=""
    :limit="1"
    accept=".pdf"
    :http-request="uploadFile"
    :before-upload="beforUPload"
    :on-exceed="handleExceed">
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
  </el-upload>
</template>

<script setup>
import { reactive, ref } from "vue";
import { uploadPost } from "@/api/request";

let file = reactive({});
const handleExceed = () => {
  ElMessage.warning("只能上传一个文件，请删除后选择重新选择！");
};
// 文件上传之前的判断限制
const beforUPload = (file) => {

};
// 自定义上传方法定义
const uploadFile = (val) => {
  file = val.file;
};
//文件提交
const submitFile = async () => {
  let formData = new FormData();
  formData.append("file", file);
  uploadPost("/product/uploadone", formData).then(res => {
    return Promise.resolve(res);
  });
};
defineExpose({ submitFile });
</script>

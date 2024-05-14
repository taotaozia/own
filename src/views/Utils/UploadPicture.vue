<template>
  <el-upload
    ref="upload"
    class="uploadPicture"
    action=""
    list-type="picture-card"
    :http-request="uploadFile"
    :limit="1"
    accept=".png"
    :on-exceed="handleExceed"
    :before-upload="beforUPload"
    :on-preview="pictureView">
    <template #trigger>
      <el-icon>
        <Plus />
      </el-icon>
    </template>
  </el-upload>
  <div class="dialog">
    <el-dialog v-model="pictureVisible">
      <img w-full :src="pictureUrl" alt="Preview Image" style="max-width: 700px" />
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { uploadPost } from "@/api/request";

let file = reactive({});
const pictureVisible = ref(false);
const pictureUrl = ref("");
const handleExceed = () => {
  ElMessage.warning("只能上传一个文件，请删除后选择重新选择！");
};
// 文件上传之前的判断限制
const beforUPload = (file) => {
  //文件大小 10MB上都是大文件  这里的 size 是字节长度
  const isSize2M = file.size / 1024 / 1024 <= 5;
  //判断类型
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJPG) {
    ElMessage.warning("上传的文件不是照片格式 jpg png ");
  }
  if (!isSize2M) {
    ElMessage.warning("上传文件的大小不能超过5MB");
  }
  return isJPG && isSize2M;
};
//放大预览
const pictureView = (file) => {
  pictureUrl.value = file.url;
  pictureVisible.value = true;
};
// 自定义上传方法定义
const uploadFile = (val) => {
  file = val.file;
};
const message = ref();
//文件提交方法
const submitFile = async () => {
  let formData = new FormData();
  formData.append("file", file);
  uploadPost("/product/uploadone", formData).then(res => {
    if (res.code === "200") {
      ElMessage.success("上传成功！");
      message.value = res.data;
    } else {
      message.value = "-1";
    }
  });
};
defineExpose({ submitFile, message });
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div><span>大文件上传</span></div>
    </template>
    <el-form-item label="大文件上传">
      <el-upload
        class="upload"
        action=""
        drag
        limit="1"
        :http-request="uploadFile"
        :on-exceed="handleExceed"
        style="margin-left: 10px;width: 500px">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">
          拖入文件 或 <em> 点击选择</em>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item class="button">
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </el-form-item>


  </el-card>
</template>
<script setup>
import { reactive, ref } from "vue";
import { uploadPost } from "@/api/request";
import axios from "axios";
import { getUploadMerge, getUploadQuery, postUploadShard } from "@/api/http";

let file = reactive({});
//默认列表
const handleExceed = () => {
  ElMessage.warning("只能上传一个文件，请删除后选择重新选择！");
};
// 自定义上传方法定义
const uploadFile = (val) => {
  file = val.file;
};
//文件提交
const onSubmit = async () => {
  if (!file.value) {

    return;
  }
  // 大文件切片
  let { name, size } = file;
  // 服务端需要监时的目录名
  let dir = "";
  // 检查文件 是否已经上传
  let index = ref(0); //默认分片
  getUploadQuery(name).then(async res => {
    if (res.data.code === "200") {
      index = res.data.data; //返回 0 代表没有上传过，不需要断点续传
    }
    // 分片上传
    let splitSize = 5 * 1024 * 1024; // 5MB
    let startSize = index * splitSize;
    while (startSize < size) {
      //对上传文件拆分
      let box = null;
      //代表最后一块文件
      if (startSize + splitSize > size) {
        box = file.slice(startSize, size);
      } else {
        box = file.slice(startSize, startSize + splitSize);
      }
      startSize += splitSize;
      //数据转换
      let boxFile = new File([box], name);
      let formData = new FormData();
      formData.append("index", index);
      formData.append("file", boxFile);

      // 请求
      postUploadShard(formData).then(ret => {
        if (ret.data.code === "200") {
          dir = ret.data.data;
          index = index + 1;
        }
      });
    }
    // 分片合并
    // 需要上传三个参数 {dir:目录名称 , name:文件名称 , ext:文件格式}
    let extSplit = name.split(".");
    let ext = extSplit[extSplit.length - 1];
    getUploadMerge(name, dir, ext).then(ref => {
      console.log(ref);
    });
  });
};

</script>
<style></style>

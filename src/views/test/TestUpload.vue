<template>
  <el-card class="box-card">
    <template #header>
      <div><span>测试功能</span></div>
    </template>
    <el-form label-width="120px">
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
    </el-form>


  </el-card>
</template>
<script setup>
import { reactive } from "vue";
import request, { uploadPost } from "@/api/request";

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
const onSubmit = () => {
  // 大文件切片
  let { name, size, raw } = file;
  // 服务端需要监时的目录名
  let dir = "";
  // 检查文件 是否已经上传
  let index = 0; //默认分片
  request.get("----------?name=" + name).then(res => {
    if (res.code === "200") {
      index = res.data.index; //返回 0 代表没有上传过，不需要断点续传
    }
    // 分片上传
    let splitSize = 5 * 1024 * 1024; // 5MB
    let startSize = index * splitSize;
    while (startSize < size) {
      //对上传文件拆分
      let box = null;
      //代表最后一块文件
      if (startSize + splitSize > size) {
        box = raw.slice(startSize, size);
      } else {
        box = raw.slice(startSize, startSize + splitSize);
      }
      startSize += splitSize;
      //数据转换
      let boxfile = new File([box], name);
      let formData = new FormData();
      formData.append("index", index);
      formData.append("file", boxfile);
      // 请求
      uploadPost("-----------", formData).then(ret => {
        if (ret.code === "200") {
          dir = ret.data.dir;
          index += 1;
        }
      });
    }

    // 分片合并
    // 需要上传三个参数 {dir:目录名称 , name:文件名称 , ext:文件格式}
    let extSplit = name.split(".");
    let ext = extSplit[extSplit.length - 1];
    uploadPost("", { name, dir, ext });
  });
};


</script>
<style></style>

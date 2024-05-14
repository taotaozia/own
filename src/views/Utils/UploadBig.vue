<template>
  <el-upload
    class="upload"
    action=""
    drag
    limit="1"
    :http-request="uploadFile"
    :on-exceed="handleExceed"
    style="margin-left: 10px;width: 480px">
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      拖入文件 或 <em> 点击选择</em>
    </div>
  </el-upload>
</template>

<script setup>
import { reactive, ref } from "vue";
import request, { uploadPost } from "@/api/request";

const fileList = ref([]);
let file = reactive();
const handleExceed = () => {
  ElMessage.warning("只能上传一个文件，请删除后选择重新选择！");
};
// 自定义上传方法定义
const uploadFile = (val) => {
  file = val.file;
};
//文件提交
const submitFile = () => {
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
      let { data1 } = uploadPost("-----------", formData);
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
defineExpose({ submitFile });
</script>

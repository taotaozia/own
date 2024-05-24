<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">产品类型添加</span></div>
    </template>
    <div class="table">
      <el-form :model="category" :rules="rules" ref="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="产品所属" prop="classify">
          <el-select v-model="category.classify">
            <el-option label="移动机器人" value="移动机器人" />
            <el-option label="智能仓储" value="智能仓储" />
            <el-option label="关节机器人" value="关节机器人" />
          </el-select>
        </el-form-item>
        <el-form-item label="类型名称" prop="categoryName">
          <el-input v-model="category.categoryName" />
        </el-form-item>
        <el-form-item label="照片">
          <el-upload
            ref="upload"
            class="uploadPicture"
            action=""
            :limit="1"
            accept=".png"
            :http-request="uploadFile"
            :before-upload="beforUPload"
            :on-exceed="handleExceed">
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="categoryDescription">
          <el-input v-model="category.categoryDescription" type="textarea" rows="5" />
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/cate')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { postAddCategory, postUploadPng } from "@/api/http";

const tiaozhuan = useRouter();

let category = ref({
  id: 0,
  categoryId: "",
  classify: "",
  categoryName: "",
  categoryDescription: "",
  picture: "",
  pictureUrl: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});
const form = ref();
const rules = {
  categoryName: [{ required: true, message: "请输入类型名称", trigger: "blur" }],
  classify: [{ required: true, message: "请选择产品所属", trigger: "blur" }],
  // categoryDescription: [{ required: true, message: "为产品添加个描述吧", trigger: "blur" }]
};

// 上传文件的功能
let file = reactive({});
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
const uploadFile = (val) => {
  file = val.file;
};
const onSubmit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      let formData = new FormData();
      formData.append("file", file);
      postUploadPng(formData).then(fRes => {
        let fileRes = fRes.data;
        if (fileRes.code === "200") {
          category.value.pictureUrl = fileRes.data;
          category.value.picture = fileRes.data.split("\\").pop();
          postAddCategory(JSON.stringify(category.value.valueOf())).then((res) => {
            if (res.code === "200") {
              ElMessage.success("更新成功");
              tiaozhuan.push("/edit/cate");
            } else {
              ElMessage.error("更新失败，请联系管理员");
            }
          });
        } else {
          ElMessage.error(fileRes.msg);
        }
      });
    }
  });
};

</script>

<style scoped>
.button {
  padding-left: 200px;
}
</style>
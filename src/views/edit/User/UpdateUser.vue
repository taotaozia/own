<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新用户信息</span></div>
    </template>
    <div class="table">
      <el-form :model="admin" label-width="auto" style="max-width: 600px">
        <el-form-item label="工号">
          <el-input v-model="admin.adminID" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="admin.name" disabled />
        </el-form-item>
        <el-form-item label="身份">
          <el-select v-model="admin.identity">
            <el-option label="一级管理员" value="一级管理员" />
            <el-option label="二级管理员" value="二级管理员" />
            <el-option label="普通用户" value="普通用户" />
          </el-select>
        </el-form-item>
        <el-form-item label="研究院">
          <el-select v-model="admin.faculty">
            <el-option label="研究总院" value="研究总院" />
            <el-option label="移动机器人事业部" value="移动机器人事业部" />
            <el-option label="智能仓储事业部" value="智能仓储事业部" />
            <el-option label="关节机器人事业部" value="关节机器人事业部" />
            <el-option label="华北营销公司" value="华北营销公司" />
            <el-option label="华东营销公司" value="华东营销公司" />
            <el-option label="华南营销公司" value="华南营销公司" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="admin.department" />
        </el-form-item>
        <el-form-item label="岗位">
          <el-input v-model="admin.post" />
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/user')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getAdmin, putUpdateAdmin } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();

let admin = ref({});
onMounted(() => {
  const id = localStorage.getItem("/edit/updateUser");
  if (id) {
    getAdmin(id).then((res) => {
      if (res.code === "200") {
        admin.value = res.data;
      }
    });
  } else {
    tiaozhuan.push("/edit/user");
  }
});
const onSubmit = () => {
  admin.value.token = "";
  putUpdateAdmin(JSON.stringify(admin.value.valueOf())).then((res) => {
    if (res.code === "200") {
      ElMessage.success("修改成功");
      tiaozhuan.push("/edit/user");
    } else {
      ElMessage.error("更新失败，请联系管理员");
    }
  });
};
</script>

<style scoped>
.button {
  padding-left: 200px;
}
</style>
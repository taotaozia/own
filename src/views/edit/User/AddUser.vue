<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">用户添加</span></div>
    </template>
    <div class="table">
      <el-form :model="admin" :rules="rules" ref="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="工号" prop="adminID">
          <el-input v-model="admin.adminID" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="admin.name" />
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select clearable v-model="admin.identity">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item label="标识" prop="classify">
          <el-input v-model="admin.classify" />
        </el-form-item>
        <el-form-item label="研究院" prop="faculty">
          <el-select v-model="admin.faculty">
            <el-option label="研究总院" value="研究总院" />
            <el-option label="质量保证部" value="质量保证部" />
            <el-option label="采购部" value="采购部" />
            <el-option label="产品制造部" value="产品制造部" />
            <el-option label="移动机器人事业部" value="移动机器人事业部" />
            <el-option label="智能仓储事业部" value="智能仓储事业部" />
            <el-option label="关节机器人事业部" value="关节机器人事业部" />
            <el-option label="华北营销公司" value="华北营销公司" />
            <el-option label="华东营销公司" value="华东营销公司" />
            <el-option label="华南营销公司" value="华南营销公司" />
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="admin.department" />
        </el-form-item>
        <el-form-item label="岗位" prop="post">
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
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { getRoles, postAddAdmin } from "@/api/http";

const tiaozhuan = useRouter();
let admin = ref({
  id: 0,
  uuid: "",
  adminID: "",
  name: "",
  identity: "",
  classify: "default",
  faculty: "",
  department: "",
  post: "",
  password: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD"),
  token: ""
});
const form = ref();
const rules = {
  adminID: [{ required: true, message: "请输入工号", trigger: "blur" }],
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  identity: [{ required: true, message: "请选择身份", trigger: "blur" }],
  faculty: [{ required: true, message: "请选择研究院", trigger: "blur" }],
  department: [{ required: true, message: "请输入部门", trigger: "blur" }],
  post: [{ required: true, message: "请输入岗位", trigger: "blur" }]
};
const roles = ref([]);

onMounted(() => {
  getRoles().then(res => {
    if (res.code === "200") {
      roles.value = res.data;
    }
  });
});
const onSubmit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      postAddAdmin(JSON.stringify(admin.value.valueOf())).then((res) => {
        if (res.code === "200") {
          ElMessage.success("添加成功");
          tiaozhuan.push("/edit/user");
        } else {
          ElMessage.error("添加失败，请联系管理员");
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
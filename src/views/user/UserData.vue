<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">个人资料</span></div>
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
          <el-input v-model="admin.identity" disabled />
        </el-form-item>
        <el-form-item label="一级部门">
          <el-input v-model="admin.faculty" disabled />
        </el-form-item>
        <el-form-item label="二级部门">
          <el-input v-model="admin.department" disabled />
        </el-form-item>
        <el-form-item label="岗位身份">
          <el-input v-model="admin.post" disabled />
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="open">修改密码</el-button>
          <el-button @click="tiaozhuan.push('/home')">返回主页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <div class="dialog">
    <el-dialog v-model="visible">
      <el-form ref="form" :model="user" :rules="rules" label-width="10vw">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="user.oldPassword" placeholder="请输入旧密码" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="user.newPassword" placeholder="请输入新密码" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="user.confirmPassword" placeholder="请确认密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="submit" style="margin-left: 8vw">保存</el-button>
          <el-button type="danger" size="mini" @click="close">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import request from "@/api/request";
import Cookies from "js-cookie";
import { onMounted, reactive, ref } from "vue";
import { getAdminByUUID, postLogin, putUpdateAdmin } from "@/api/http";
import { useStore } from "vuex";

const store = useStore();
const jieshou = useRoute();
const tiaozhuan = useRouter();
const form = ref();
let admin = ref({});
const user = reactive({ oldPassword: "", newPassword: "", confirmPassword: "" });
const visible = ref(false);

onMounted(() => {
  admin.value = store.state.user.admin;
});
const open = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};
const equalToPassword = (rule, value, callback) => {
  if (user.newPassword !== value) {
    callback(new Error("两次输入的密码不一致"));
  } else {
    callback();
  }
};
const rules = {
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
  newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" },
    { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }],
  confirmPassword: [{ required: true, message: "请重新输入新密码", trigger: "blur" },
    { required: true, validator: equalToPassword, trigger: "blur" }]
};

let loginuser = ref({ account: "", password: "" });

const submit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      loginuser.value.account = admin.value.adminID;
      loginuser.value.password = user.oldPassword;
      postLogin(JSON.stringify(loginuser.value.valueOf())).then(res => {
        if (res.code === "200") {
          admin.value.password = user.newPassword;
          admin.value.token = "";
          putUpdateAdmin(JSON.stringify(admin.value.valueOf())).then((res) => {
            console.log(res);
            if (res.code === "200") {
              ElMessage.success("修改成功");
              tiaozhuan.push("/login");
            } else {
              ElMessage.error("更新失败，请联系管理员");
            }
          });
        } else {
          ElMessage.error("旧密码错误！");
        }
      });
    }
  });
};
</script>

<style scoped>
.button {
  padding-left: 20vw;
}
</style>
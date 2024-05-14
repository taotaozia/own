<template>
  <div class="wrapper">
    <div class="building">
      <div class="logTitle">登 录</div>
      <el-form
        :label-position="'right'"
        label-width="auto"
        style="max-width: 300px"
        :model="loginuser"
        :rules="logRules"
        ref="form">
        <el-form-item style="margin-top: 15px" prop="account">
          <el-col :span="1">
            <el-icon>
              <User />
            </el-icon>
          </el-col>
          <el-col :span="11">
            <el-input placeholder="工号" v-model="loginuser.account"
                      style="width: 250px; margin-left: 1vw" />
          </el-col>
        </el-form-item>
        <el-form-item prop="password">
          <el-col :span="1">
            <el-icon>
              <Lock />
            </el-icon>
          </el-col>
          <el-col :span="11">
            <el-input placeholder="密码" show-password v-model="loginuser.password"
                      style="width: 250px;margin-left: 1vw" />
          </el-col>
        </el-form-item>
        <el-form-item style="margin-top: 1vh">
          <el-button
            type="primary"
            round
            @keydown.exact="keyDown"
            @click="login"
            style="width: 300px;font-size: 15px;margin-top: 10px;">
            登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <router-view />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { getRouters, postLogin } from "@/api/http";
import { useStore } from "vuex";

const store = useStore();
const tiaozhuan = useRouter();
const loginuser = ref({
  account: "",
  password: ""
});
const form = ref();
const logRules = {
  account: [{ required: true, message: "请输入工号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
};
onMounted(() => {
  //绑定监听事件
  window.addEventListener("keydown", keyDown);
});
onUnmounted(() => {
  //销毁事件
  window.removeEventListener("keydown", keyDown, false);
});
const keyDown = (e) => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    login();
  }
};
const login = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      postLogin(JSON.stringify(loginuser.value.valueOf())).then(res => {
        if (res.code === "200") {
          Cookies.set("adminID", res.data.uuid);
          store.commit("setUser", res.data);
          getRouters(res.data.uuid).then(ret => {
            if (res.code === "200") {
              store.commit("setRouters", ret.data);
            }
          });
          tiaozhuan.push("/home");
          loginuser.account = "";
          loginuser.password = "";
          ElMessage.success("登录成功");
        } else if (res.code === "403") {
          ElMessage.error("账号或密码错误");
        } else {
          ElMessage.error("系统错误");
        }
      });
    }
  });

};
</script>

<style>
.building {
  opacity: 0.65;
  width: 300px;
  height: 200px;
  background-color: rgba(240, 248, 255, 0.8);
  border-radius: 5vh;
  margin: 20vh auto;
  padding: 3vh 3vw;
  text-align: center;
}

.wrapper {
  background: url("@/assets/loginBack.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  //background-color: rgba(189, 189, 189, 0.1);
}

.logTitle {
  font-size: 30px;
  color: cornflowerblue;
}
</style>

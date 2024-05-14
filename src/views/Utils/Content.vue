<template>
  <div class="header">
    <div class="icon">
      <img src="../../assets/LGIMLog.png" height="45" width="350" />
    </div>
    <div class="right">
      <div class="time">{{ time }}</div>
      <div class="line">|</div>
      <div class="user">
        <el-dropdown split-button type="warning">
          <span class="name">{{ adminName }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/userData')">个人资料</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <!--end right-->
    </div>
    <!--end head-->
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useStore } from "vuex";

// 变量
const store = useStore();
let time = ref(null);
const router = useRouter();
let adminName = ref(null);
// 函数
onMounted(() => {
  adminName.value = store.state.user.admin.name;
});

const logout = () => {
  Cookies.remove("adminID");
  router.push("/login");
};

</script>

<style lang="less" scoped>
.header {
  line-height: 50px;
  background: rgba(84, 92, 100, 0.34);
  color: white;
  display: flex;

  .icon {
    margin-top: 0.5vw;
    margin-left: 10px;
    flex: 1;
  }

  .right {
    padding-right: 20px;
    display: flex;

    .time {
      flex: 1;
      font-size: 16px;
    }

    .line {
      margin-left: 10px;
      margin-right: 10px;
    }

    .user {
      padding-top: 10px;
    }
  }
}
</style>

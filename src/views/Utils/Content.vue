<template>
  <div class="header">
    <div class="icon">
      <img src="../../assets/LGIMLog.png" height="45" width="350" />
    </div>
    <div class="right">
      <div class="message">
        <el-tooltip effect="light" content="个人消息">
          <el-button type="warning" style="margin-right: 10px" circle @click="table = true">
            <el-icon>
              <ChatLineRound />
            </el-icon>
          </el-button>
        </el-tooltip>
        <el-drawer
          v-model="table"
          :with-header="false"
          size="40%" style="margin-top: 8vh;height: 92vh">
          <UserNotice />
        </el-drawer>
      </div>
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
import UserNotice from "@/views/Utils/UserNotice.vue";

// 变量
const store = useStore();
const router = useRouter();
let adminName = ref(null);
const table = ref(false);

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

    .user {
      padding-top: 10px;
    }
  }
}
</style>

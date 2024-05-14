<template>
  <div class="main">
    <div class="one">
      <div class="calendar">
        <el-card class="calendar-box">
          <!--          <template #header>-->
          <!--            <span>日历</span>-->
          <!--          </template>-->
          <div class="calendar-data">
            <calendar />
          </div>
        </el-card>
      </div>
      <div class="poetry">
        <div class="content">
          <h2>{{ CN }}</h2>
          <h3>{{ EN }}</h3>
        </div>
      </div>
    </div>

    <div class="tow">
      <div class="message">
        <el-card class="message-box">
          <template #header>
            <span>个人消息</span>
          </template>
          <div>
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="待办事项" name="first">
                <el-table
                  :show-header="false"
                  :data="hasData.value"
                  style="height: 150px"
                >
                  <el-table-column>
                    <template v-slot="scope">
                      <el-button type="text" @click="openNotice(scope.row)">{{ scope.row.title }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updatetime" width="200px" />
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="已办事项" name="second">
                <el-table
                  :show-header="false"
                  :data="hadData.value"
                  style="height: 150px"
                >
                  <el-table-column>
                    <template v-slot="scope">
                      <el-button type="text" @click="openNotice(scope.row)">{{ scope.row.title }}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column prop="updatetime" width="200px" />
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </div>

      <div class="notice">
        <el-card class="notice-box">
          <template #header>
            <span>系统消息</span>
          </template>
          <div class="noticeTable">
            <el-table
              :show-header="false"
              :data="noticeData.value"
              style="height: 200px"
            >
              <el-table-column>
                <template v-slot="scope">
                  <el-button type="text" @click="openNotice(scope.row)">{{ scope.row.title }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="updatetime" width="200px" />
            </el-table>
          </div>
          <el-dialog v-model="noticeVisible" center>
            <p v-html="notice"></p>
            <template #footer>
              <div class="dialog-footer">
                <el-button @click="noticeVisible = false">已阅</el-button>
              </div>
            </template>
          </el-dialog>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { getNotices, getUserNotices } from "@/api/http";
import { useStore } from "vuex";
import Calendar from "@/views/Utils/Calendar.vue";

const store = useStore();
const CN = ref();
const EN = ref();
const notice = ref();
let noticeVisible = ref(false);
const noticeData = reactive([]);
const hasData = reactive([]);
const hadData = reactive([]);
const activeName = ref("");



onMounted(() => {
  axios({ url: "https://api.kekc.cn/api/yien" }).then(res => {
    if (res) {
      CN.value = res.data.cn;
      EN.value = res.data.en;
    }
  });
  getNotices().then(res => {
    if (res.code === "200") {
      noticeData.value = res.data;
    }
  });
  getUserNotices(store.state.user.admin.uuid).then(res => {
    if (res.code === "200") {
      hasData.value = res.data.hasData;
      hadData.value = res.data.hadData;
    }
  });
});
const openNotice = (row) => {
  noticeVisible.value = true;
  notice.value = row.noticeText;
};


</script>

<style>

.one {
  display: flex;
}

.calendar {
  width: 39vw;
  height: 45vh;
}

.calendar-data {

}

.poetry {
  width: 44vw;
  height: 45vh;
  margin-left: 1vw;
  background: url("@/assets/noticeBack.jpg");
  background-size: 100% 100%;
  opacity: 0.7;

  .content {
    margin: 15vh 5vw;
    color: #000000;
  }
}

.tow {
  margin-top: 1vw;
  display: flex;
}

.message {
  width: 39vw;
  height: 43vh;
}

.notice {
  margin-left: 1vw;
  width: 44vw;
  height: 43vh;
}


</style>

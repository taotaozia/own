<template>
  <div class="calendar">
    <calendar :project="arr"/>
  </div>
  <div class="poetry">
    <div class="content">
      <h2>{{ CN }}</h2>
      <h3>{{ EN }}</h3>
    </div>
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
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axios from "axios";
import { getNotices } from "@/api/http";
import { useStore } from "vuex";
import Calendar from "@/views/Utils/Calendar.vue";

const store = useStore();
const CN = ref();
const EN = ref();
const notice = ref();
let noticeVisible = ref(false);
const noticeData = reactive([]);


const arr = ref([
  { data: "2024-05-10", content: "项目1" },
  { data: "2024-05-10", content: "项目2" },
  { data: "2024-05-10", content: "项目3" },
  { data: "2024-05-11", content: "项目1" },
  { data: "2024-05-12", content: "项目1" }
]);
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

});

const openNotice = (row) => {
  noticeVisible.value = true;
  notice.value = row.noticeText;
};


</script>

<style>

.calendar {
  width: 40vw;
  height: 90vh;

}

.poetry {
  margin-top: -89vh;
  margin-left: 41vw;
  width: 43vw;
  height: 45vh;
  background: url("@/assets/noticeBack.jpg");
  background-size: 100% 100%;
  opacity: 0.7;

  .content {
    padding: 15vh 5vw;
    color: #000000;
  }
}

.notice {
  margin-top: 1vh;
  margin-left: 41vw;
  width: 43vw;
  height: 43vh;
}


</style>

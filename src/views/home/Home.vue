<template>
  <div class="calendar">
    <Calendar :project="arr" />
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
          style="height: 200px">
          <el-table-column>
            <template v-slot="scope">
              <el-button type="text" @click="openNotice(scope.row)">{{ scope.row.title }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="updatetime" width="200px" />
        </el-table>
      </div>
      <el-dialog v-model="noticeVisible" :title="title" center>
        <Editor v-model="notice" aria-readonly="true" />
        <template #footer>
          <div class="dialog-footer" style="margin-top: 30px">
            <el-button type="primary" @click="noticeVisible = false">已阅</el-button>
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
import { Editor } from "@wangeditor/editor-for-vue";

const store = useStore();
const CN = ref();
const EN = ref();
const notice = ref();
const title = ref();
let noticeVisible = ref(false);
const noticeData = reactive([]);
const arr = ref([
  { type: "success", dayData: "2024-05-01", workType: "出勤", logs: "" },
  { type: "warning", dayData: "2024-05-02", workType: "休息", logs: "" },
  { type: "danger", dayData: "2024-05-03", workType: "请假", logs: "" },
  { type: "info", dayData: "2024-05-04", workType: "放假", logs: "" }
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
  notice.value = row.noticeText;
  title.value = row.title;
  noticeVisible.value = true;
};


</script>

<style>

.calendar {
  width: 40vw;
  height: 90vh;

}

.poetry {
  margin-top: -89vh;
  margin-left: 40vw;
  width: 43vw;
  height: 45vh;
  background: url("@/assets/noticeBack.jpg");
  background-size: 100% 100%;
  opacity: 0.65;

  .content {
    padding: 15vh 5vw;
    color: #000000;
  }
}

.notice {
  margin-top: 1vh;
  margin-left: 40vw;
  width: 43vw;
  height: 43vh;
}


</style>

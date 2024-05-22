<template>
  <el-card class="box-card">
    <template #header>
      <div><span>日志填写</span></div>
    </template>
    <div class="dayLog">
      <div class="day">
        <h4 style="float: left;margin-top: 5px;margin-left: 20px">日期：</h4>
        <el-select v-model="DayLog.dayData" style="width: 240px">
          <el-option v-for="item in week" :label="item" :value="item" />
        </el-select>
        <el-button icon="Search" circle style="margin-left: 10px" type="primary" @click="getDayLog" />
      </div>
      <div class="workTypeSelect">
        <h4 style="float: left;margin-top: 5px;margin-left: 20px">工作状态：</h4>
        <el-select v-model="DayLog.workType" style="width: 100px">
          <el-option v-for="item in workTypes" :label="item.work" :value="item.work">
            <el-tag :type="item.type" style="margin-right: 8px" size="small">{{ item.work }}</el-tag>
          </el-option>
        </el-select>
      </div>
      <div class="wangEditor">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" />
        <Editor v-model="valueHtml" :defaultConfig="editorConfig"
                @onCreated="handleCreated" style="height: 300px; overflow-y: hidden;" />
      </div>
      <div class="submitButton">
        <el-button type="primary" @click="addDayLog" style="margin-left: 30vw">确认</el-button>
      </div>
    </div>

  </el-card>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
import { addLog, getLog } from "@/api/http";
import { ElNotification } from "element-plus";

const store = useStore();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
let valueHtml = ref("");
const toolbarConfig = { excludeKeys: ["group-image", "group-video"] };
const editorConfig = { placeholder: "请输入内容..." };
const week = ref([]);
const workTypes = ref([
  { type: "success", work: "出勤" },
  { type: "danger", work: "请假" },
  { type: "info", work: "休息" }
]);
let DayLog = ref({
  id: 0, uuid: "",
  adminID: store.state.user.admin.adminID,
  dayData: new Date().toLocaleDateString(),
  workType: "出勤",
  workLog: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});

onMounted(() => {
  const time = new Date();
  for (let i = 1; i <= 7; i++) {
    week.value.push(time.toLocaleDateString());
    time.setDate(time.getDate() - 1);
  }
});
const getDayLog = () => {
  valueHtml.value = "";
  const request = ref({ adminID: DayLog.value.adminID, dayData: DayLog.value.dayData });
  getLog(JSON.stringify(request.value)).then(res => {
    if (res.code === "200") {
      DayLog.value = res.data;
      valueHtml.value = res.data.workLog;
    }
  });

};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const addDayLog = () => {
  DayLog.value.workLog = valueHtml.value;
  console.log(JSON.stringify(DayLog.value));
  addLog(JSON.stringify(DayLog.value)).then(res => {
    console.log(res)
    if (res.code === "200") {
      ElNotification.success("添加成功");
    }
  });
};
</script>
<style>
.workTypeSelect {
  margin-top: -30px;
  margin-left: 400px;
}

.wangEditor {
  width: 60vw;
  margin: 20px 0;
  border: 1px solid #000000;
}
</style>

<template>
  <div>
    <el-calendar>
      <template #date-cell="{ data }">
        <div style="width: 100%;height: 100%" @dblclick="handleClick(data.day)">
          {{ data.day.split("-").slice(2).join("-") }}
<!--          <div style="width:100%;" v-for="item in props.project" :key="data">-->
<!--            <el-tag :type="item.type" v-if="item.dayData === data.day" size="small">-->
<!--              {{ item.workType }}-->
<!--            </el-tag>-->
<!--          </div>-->
<!--          <el-tag type="success" size="small">出勤</el-tag>-->
        </div>
      </template>
    </el-calendar>
  </div>
  <div>
    <el-dialog v-model="workLog" center style="height: 75%;width: 80%">
      <div>
      </div>

      <div class="dayState">
        {{ today }} 状态：
        <el-input style="width: 100px" />
      </div>
      <span style="line-height: 40px">日志：</span>
      <div class="dayLogs">
        <LogEdit :valueHtml="todayLogs" />
      </div>
      <template #footer>
        <div class="dialog-footer" style="">
          <el-button @click="workLog = false">取消</el-button>
          <el-button type="primary" @click="workLog = false">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ElCalendar } from "element-plus";
import { ref } from "vue";
import LogEdit from "@/views/Utils/LogEdit.vue";

const props = defineProps({ project: [] });
const workLog = ref(false);
const today = ref("");
const todayLogs = ref("");


const handleClick = (day) => {
  if (Date.parse(day) > new Date()) {
    return;
  }
  // workLog.value = true;
  today.value = day;
  for (let i = 0; i < props.project.length; i++) {
    if (props.project[i].dayData === day) {
      todayLogs.value = props.project[i].logs;
    }
  }
};

</script>
<style scoped>
.dayLogs {
  border: 1px solid #000;
}

.dayState {
  line-height: 50px;
}
</style>

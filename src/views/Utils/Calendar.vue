<template>
  <el-calendar style="">
    <template #date-cell="{ data }">
      <div>{{ data.day.split("-").slice(2).join("-") }}</div>
      <div style="width:100%;" v-for="item in arr" :key="item">
        <el-tag type="success" v-if="(item.data).indexOf(data.day.split('-').slice(2).join('-'))!=-1">
          {{ item.content }}
        </el-tag>
      </div>
    </template>
  </el-calendar>
</template>
<script setup>
import { ElCalendar } from "element-plus";
import { ref } from "vue";

const arr = ref([
  { data: "2024-04-10", content: "日程安排" }
]);
</script>

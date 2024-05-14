<template>
  <el-card class="box-card">
    <template #header>
      <div><span>日历</span></div>
    </template>
    <el-calendar style="width: 50vw">
      <template #date-cell="{ data }">
        <div style="height: 100%" :class="data.isSelected ? 'is-selected' : ''" @click="handleClick(data.day)">
          <div>{{ data.day.split("-").slice(2).join("-") }}</div>
          <div v-if="arr.find(v => v.data === data.day)">{{ arr.find(v => v.data === data.day).content }}</div>
        </div>
      </template>
    </el-calendar>

  </el-card>
</template>
<script setup>

import { ref } from "vue";

const arr = ref([
  { data: "2024-04-10", content: "日程安排" }
]);

const handleClick = () => {
  alert("展示内容")
};
</script>
<style></style>

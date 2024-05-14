<template>
  <el-calendar style="">
    <template #date-cell="{ data }">
      <div style="width: 100%;height: 100%" @click="handleClick(data.day)">
        {{ data.day.split("-").slice(2).join("-") }}
        <div style="width:100%;" v-for="item in props.project" :key="data">
          <el-tag :type="item.type" v-if="item.data === data.day" size="small">
            {{ item.content }}
          </el-tag>
        </div>
      </div>
    </template>
  </el-calendar>
</template>
<script setup>
import { ElCalendar } from "element-plus";

const props = defineProps({ project: [] });

const handleClick = (day) => {

  for (let i = 0; i < props.project.length; i++) {
    if(props.project[i].data === day){
      alert(props.project[i].content)
    }
  }
};
</script>

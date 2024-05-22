<template>
<h2> 关节机器人产品资源表 --- 开发中</h2>
</template>
<script setup>
import CategoryImg from "@/views/Utils/CategoryImg.vue";
import { onMounted, reactive } from "vue";
import { getCategoryClass } from "@/api/http";

let data1 = reactive([]);
// 初始化方法
onMounted(() => {
  getCategoryClass("关节机器人").then((res) => {
    if (res.code === "200") {
      data1.value = res.data.slice(0, 4);
    }
  });
});

</script>
<style scoped>

</style>
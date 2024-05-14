<script setup>
import axios from "axios";
import { onMounted } from "vue";

onMounted(() => {
  axios({ url: "https://api.xygeng.cn/one/get/" }).then(res => {
    console.log("one一句");
    console.log(res);
  });
  axios({ url: "https://v1.hitokoto.cn/" }).then(res => {
    console.log("一言每日一句");
    console.log(res);
  });
  axios({ url: "https://v1.jinrishici.com/rensheng.txt" }).then(res => {
    console.log("随机一句诗词");
    console.log(res);
  });
  axios({ url: "https://api.uomg.com/api/rand.qinghua" }).then(res => {
    console.log("随机一句情话");
    console.log(res);
  });
  axios({ url: "https://api.oioweb.cn/api/common/history" }).then(res => {
    console.log("历史上的今天");
    console.log(res);
  });
  axios({ url: "https://api.kekc.cn/api/yien" }).then(res => {
    console.log("随机中英文句子");
    console.log(res);
  });
  axios({ url: "https://api.oioweb.cn/api/common/OneDayEnglish" }).then(res => {
    console.log("随机中英文句子--带图片");
    console.log(res);
  });



});

</script>

<template>

</template>

<style scoped>

</style>
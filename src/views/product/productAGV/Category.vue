<template>
  <div style="overflow: hidden">
    <div class="title">
      <!--      <h1>移动机器人产品汇总</h1>-->
    </div>
    <div class="prod">
      <div>
        <CategoryImg :data="updata" TZPath="/product/agvlist" />
      </div>
      <div>
        <CategoryImg :data="downdata" TZPath="/product/agvlist" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import CategoryImg from "@/views/Utils/CategoryImg.vue";
import { getCategorys } from "@/api/http";


let updata = reactive([]);
let downdata = reactive([]);
// 初始化方法
onMounted(() => {
  getCategorys("移动机器人").then((res) => {
    if (res.code === "200") {
      updata.value = res.data.slice(0, 4);
      downdata.value = res.data.slice(4, 8);
    }
  });
});
</script>

<style lang="scss" scoped>
.title {
  height: 5vh;
}

.prod {
  text-align: center;
  width: 85vw;
}
</style>

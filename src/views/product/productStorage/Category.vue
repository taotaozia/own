<template>

  <div class="prod" style="margin-top: 8vh">
    <div
      class="maskContainer"
      v-for="(item, index) in data1.value"
      :key="index">
      <div
        class="backImg"
        @click="getlist(item.categoryId)"
        @mouseover="addActive($event)"
        @mouseout="removeActive($event)">
        <h2 style="text-align: center; color: #757575;margin-top: 20px">
          {{ item.categoryName }}
        </h2>
        <div class="img">
          <el-image :src="readImg(item.picture)" alt="" class="originalImg" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from "vue";
import { getCategoryClass } from "@/api/http";
import { useRouter } from "vue-router";

const tiaozhuan = useRouter();
//方法
const addActive = ($event) => {
  $event.currentTarget.className = "backImg-active";
};
const removeActive = ($event) => {
  $event.currentTarget.className = "backImg";
};
// 读取照片
const readImg = (imgName) => {
  return "http://192.168.3.237:6688/img/static/" + imgName;
};
const getlist = (CUID) => {
  localStorage.setItem("/product/storagelist", CUID);
  tiaozhuan.push("/product/storagelist");
};
let data1 = reactive([]);
// 初始化方法
onMounted(() => {
  getCategoryClass("智能仓储").then((res) => {
    if (res.code === "200") {
      data1.value = res.data.slice(0, 4);
    }
  });
});

</script>
<style scoped>

.maskContainer {
  display: inline-block;
  position: relative;
  width: 30vw;
  height: 20vh;
  margin-top: 2vh;
  margin-left: 8vw;
  border-radius: 20px;
}

.backImg-active {
  border-radius: 20px;
  background-color: #bdbdbd;
}

.img {
  position: relative;
  text-align: center;

  .originalImg {
    position: relative;
    padding-top: 1vh;
    width: 400px;
    height: 200px;
  }
}
</style>
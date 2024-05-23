<template>
  <div
    class="maskContainer"
    v-for="(item, index) in props.data.value"
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
      <!--      <el-tooltip effect="light">-->
      <!--        <template #content>-->
      <!--          <el-input-->
      <!--            v-model="item.categoryDescription"-->
      <!--            type="textarea"-->
      <!--            :rows="5"-->
      <!--            disabled-->
      <!--            style="width: 275px"-->
      <!--          />-->
      <!--        </template>-->

      <!--      </el-tooltip>-->
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({ data: {}, TZPath: {} });
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
  localStorage.setItem(props.TZPath, CUID);
  tiaozhuan.push(props.TZPath);
};
</script>

<style lang="scss" scoped>

.maskContainer {
  display: inline-block;
  position: relative;
  width: 20vw;
  height: 25vh;
  margin-top: 2vh;
  margin-left: 1vw;
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
    width: 200px;
    height: 150px;
  }
}
</style>

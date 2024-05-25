<template>
  <div class="title"><h2>《 {{ name }} 》</h2></div>
  <div class="topimg">
    <div>
      <div class="maskContainer"
           v-for="(item,index) in imgdata" :key="index">
        <div class="img">
          <el-image class="originalImg" :src="readImg(item)" />
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <el-tabs v-model="activeName" class="demo-tabs">
      <div v-for="item in dataTable">
        <el-tab-pane :label="item.type" :name="item.type">
          <div class="table1">
            <el-table
              :show-header="false"
              :data="item.dataList"
              :span-method="objectSpanMethod"
              style="width: 1000px"
              border>
              <el-table-column prop="type" width="150" />
              <el-table-column prop="head" width="300" />
              <el-table-column prop="contents" />
            </el-table>
          </div>
        </el-tab-pane>
      </div>

    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { getDetailTable } from "@/api/http";

// 三张照片
const imgdata = ref([]);
const name = ref([]);
const activeName = ref("");
let dataTable = reactive({});

// 初始化方法
onMounted(() => {
  let DUID = localStorage.getItem("/product/details");
  // 选项内容
  getDetailTable(DUID).then((res) => {
    if (res.code === "200") {
      name.value = res.data.name;
      imgdata.value = res.data.imgData;
      dataTable = res.data.tables;
      activeName.value = dataTable[0].type;
    }
  });
});
//方法
// 读取图片路径
const readImg = (imgName) => {
  return "http://192.168.3.237:6688/img/static/" + imgName;
};
// 合并标题
const objectSpanMethod = ({ rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    if (rowIndex % 20 === 0) {
      return { rowspan: 20, colspan: 1 };
    } else {
      return { rowspan: 0, colspan: 0 };
    }
  }
};


</script>

<style lang="scss" scoped>
.title {
  margin-top: 1vh;
  text-align: center;
}

.topimg {
  text-align: center;
  max-height: 200px;
  overflow: hidden;
}

.maskContainer {
  display: inline-block;
  width: 300px;
  height: 200px;
  margin-left: 2vw;
}

.originalImg {
  width: 300px;
  height: 200px;
}

.bottom {
  margin-top: 10px;
  margin-left: 5vw;
  margin-bottom: 100px;
}

</style>

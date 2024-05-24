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
      <el-tab-pane label="基本参数" name="first">
        <div class="table1">
          <el-table
            :show-header="false"
            :data="dataList1"
            :span-method="objectSpanMethod"
            style="width: 1000px"
            border>
            <el-table-column prop="type" width="150" />
            <el-table-column prop="head" width="300" />
            <el-table-column prop="contents" />
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="运动性能" name="second">
        <div class="table2">
          <el-table
            :show-header="false"
            :data="dataList2"
            :span-method="objectSpanMethod"
            style="width: 1000px"
            border>
            <el-table-column prop="type" width="150" />
            <el-table-column prop="head" width="300" />
            <el-table-column prop="contents" />
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全防护" name="third">
        <div class="table3">
          <el-table
            :show-header="false"
            :data="dataList3"
            :span-method="objectSpanMethod"
            style="width: 1000px"
            border>
            <el-table-column prop="type" width="150" />
            <el-table-column prop="head" width="300" />
            <el-table-column prop="contents" />
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="电池性能" name="fourth">
        <div class="table4">
          <el-table
            :show-header="false"
            :data="dataList4"
            :span-method="objectSpanMethod"
            style="width: 1000px"
            border>
            <el-table-column prop="type" width="150" />
            <el-table-column prop="head" width="300" />
            <el-table-column prop="contents" />
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailTable } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();

// 三张照片
const imgdata = ref([]);
const name = ref([]);
// 表格数据
let dataList1 = reactive([]);
let dataList2 = reactive([]);
let dataList3 = reactive([]);
let dataList4 = reactive([]);

// 标签
const activeName = ref("");

// 初始化方法
onMounted(() => {
  let DUID = jieshou.query.DUID;
  // 选项内容
  getDetailTable(DUID).then((res) => {
    if (res.code === "200") {
      name.value = res.data.name;
      imgdata.value = res.data.imgData;
      dataList1 = res.data.dataList1;
      dataList2 = res.data.dataList2;
      dataList3 = res.data.dataList3;
      dataList4 = res.data.dataList4;
      activeName.value = "first";
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
    if (rowIndex % 10 === 0) {
      return {
        rowspan: 10,
        colspan: 1
      };
    } else {
      return {
        rowspan: 0,
        colspan: 0
      };
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

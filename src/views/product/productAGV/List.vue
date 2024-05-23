<template>
  <div class="search">
    <el-select
      clearable
      placeholder="请选择负载"
      v-model="loadValue"
      style="width: 200px; margin-left: 10px">
      <el-option
        v-for="item in loadSelects"
        :key="item.id"
        :label="item.value"
        :value="item.value"
      />
    </el-select>
    <el-select
      clearable
      placeholder="请选择控制器"
      v-model="controlValue"
      style="width: 200px; margin-left: 10px">
      <el-option
        v-for="item in controlSelects"
        :key="item.id"
        :label="item.value"
        :value="item.value"
      />
    </el-select>
    <el-select
      clearable
      placeholder="请选择导航方式"
      v-model="driveValue"
      style="width: 200px; margin-left: 10px">
      <el-option
        v-for="item in driveSelects"
        :key="item.id"
        :label="item.value"
        :value="item.value"
      />
    </el-select>
    <el-select
      clearable
      placeholder="请选择底盘"
      v-model="chassisValue"
      style="width: 200px; margin-left: 10px">
      <el-option
        v-for="item in chassisSelects"
        :key="item.id"
        :label="item.value"
        :value="item.value"
      />
    </el-select>

    <el-button style="margin-left: 10px" type="primary" @click="search">
      <el-icon>
        <Search />
      </el-icon>
      <span>搜索</span>
    </el-button>
    <el-button type="warning" @click="reset">
      <el-icon>
        <Refresh />
      </el-icon>
      <span>重置</span>
    </el-button>
  </div>
  <div class="table">
    <el-table
      :data="tableData.value"
      border
      style="width: 100%"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" width="50" />
      <el-table-column prop="productType" label="产品型号" />
      <el-table-column prop="productLoad" label="负载(T)" />
      <el-table-column prop="productModel" label="车型" />
      <el-table-column prop="productControl" label="控制器" />
      <el-table-column prop="productDrive" label="导航方式" />
      <el-table-column prop="productChassis" label="底盘" />
      <el-table-column prop="productDirector" label="产品负责人" />
      <el-table-column>
        <template v-slot="tableData">
          <el-tooltip effect="light" content="查看详情">
            <el-button :icon="ZoomIn" type="primary" @click="lookdetail(tableData.row)" />
          </el-tooltip>
          <el-tooltip effect="light" content="资源下载">
            <el-button :icon="Download" type="warning" @click="lookDownload(tableData.row)" style="margin-left: 5px" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="page">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="prev, pager, next"
      :total="total"
      :background="true"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { ElTable } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { getProductSelect, putProductList } from "@/api/http";
import { Download, ZoomIn } from "@element-plus/icons-vue/global";

const jieshou = useRoute();
const tiaozhuan = useRouter();
//变量
const loadValue = ref("");
const chassisValue = ref("");
const controlValue = ref("");
const driveValue = ref("");
const currentPage = ref(1);
const pageSize = 10;
// 需要接收数据 --------
const total = ref(0);
const loadSelects = reactive([]);
const controlSelects = reactive([]);
const driveSelects = reactive([]);
const chassisSelects = reactive([]);
const tableData = reactive([]);

//初始化方法
onMounted(() => {
  let CUID = localStorage.getItem("/product/agvlist");
  // 列表内容
  search();
  // 选项内容
  getProductSelect(CUID).then((res) => {
    if (res.code === "200") {
      total.value = res.data.total;
      selectvalue(res.data.load, loadSelects);
      selectvalue(res.data.control, controlSelects);
      selectvalue(res.data.drive, driveSelects);
      selectvalue(res.data.chassis, chassisSelects);
    }
  });
});


// 所有的请求设置
const proListRes = ref({
  pageNum: currentPage.value,
  pageSize: pageSize.valueOf(),
  category: localStorage.getItem("/product/agvlist"),
  load: "",
  chassis: "",
  control: "",
  drive: "",
  productID: ""
});
//函数
const lookdetail = (row) => {
  if (row.valueOf().detailID !== "") {
    localStorage.setItem("product/agvdetails", row.valueOf().detailID);
    tiaozhuan.push("/product/agvdetails");
  } else {
    ElMessage.error("该产品没有详情页，请联系管理员添加");
  }
};
// 赋值选项
const selectvalue = (datavalue, select) => {
  for (let i = 0; i < datavalue.length; i++) {
    select[i] = { id: i + 1, value: datavalue[i] };
  }
};
// 换页
const handleCurrentChange = (val) => {
  proListRes.value.pageNum = val;
  search();
};
// 搜索方法
const search = () => {
  // 需要先对传入对象初始化
  proListRes.value.load = loadValue.value;
  proListRes.value.chassis = chassisValue.value;
  proListRes.value.control = controlValue.value;
  proListRes.value.drive = driveValue.value;
  putProductList(JSON.stringify(proListRes.value.valueOf())).then((res) => {
    if (res.code === "200") {
      tableData.value = res.data;
    }
  });
};
// 重置方法
const reset = () => {
  loadValue.value = "";
  chassisValue.value = "";
  controlValue.value = "";
  driveValue.value = "";
  search();
};

const lookDownload = (row) => {
  localStorage.setItem("product/agvdownloads", row.valueOf().productId);
  tiaozhuan.push("/product/agvdownloads");
};
</script>

<style lang="less" scoped>
.search {
  margin-top: 1.5vh;
  margin-left: 1vw;
}

.table {
  width: 83vw;
  max-height: 85vh;
  margin-top: 1.5vh;
}

.page {
  margin-top: 2vh;
}
</style>

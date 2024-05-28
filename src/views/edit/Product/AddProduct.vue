<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">产品添加</span></div>
    </template>
    <div class="table">
      <el-form :inline=true :model="product" :rules="rules" ref="form" label-width="auto" style="max-width: 85vw">
        <el-form-item label="关联产品类型" prop="categoryName">
          <el-select clearable v-model="product.categoryName" style="width: 200px">
            <el-option
              v-for="item in categorySelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品详情页" prop="detailName">
          <el-select clearable v-model="product.detailName" style="width: 200px">
            <el-option
              v-for="item in detailSelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="车辆名称" prop="productName">
          <el-input v-model="product.productName" />
        </el-form-item>
        <el-form-item label="物料编号" prop="productBOM">
          <el-input v-model="product.productBOM" />
        </el-form-item>
        <el-form-item label="负责人" prop="productDirector">
          <el-input v-model="product.productDirector" />
        </el-form-item>
        <el-form-item label="类型编号" prop="productType">
          <el-input v-model="product.productType" />
        </el-form-item>
        <el-form-item label="负载" prop="productLoad">
          <el-input v-model="product.productLoad" />
        </el-form-item>
        <el-form-item label="车型" prop="productModel">
          <el-autocomplete
            v-model="product.productModel"
            :fetch-suggestions="modelSearch"
            clearable />
        </el-form-item>
        <el-form-item label="控制器" prop="productControl">
          <el-autocomplete
            v-model="product.productControl"
            :fetch-suggestions="controlSearch"
            clearable />
        </el-form-item>
        <el-form-item label="导航方式" prop="productDrive">
          <el-autocomplete
            v-model="product.productDrive"
            :fetch-suggestions="driveSearch"
            clearable />
        </el-form-item>
        <el-form-item label="底盘" prop="productChassis">
          <el-autocomplete
            v-model="product.productChassis"
            :fetch-suggestions="chassisSearch"
            clearable />
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/products')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { getDetailProTypeSelect, postAddProduct } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();

let product = ref({
  id: 0,
  productId: "",
  categoryId: "",
  detailID: "",
  categoryName: "",
  detailName: "",
  productName: "",
  productBOM: "",
  productDirector: "",
  productType: "",
  productLoad: "",
  productControl: "",
  productDrive: "",
  productChassis: "",
  productModel: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});
const form = ref();
const rules = {
  categoryName: [{ required: true, message: "请选择关联产品类型", trigger: "blur" }],
  detailName: [{ required: true, message: "请选择关联产品详情页", trigger: "blur" }],
  productName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  productType: [{ required: true, message: "请输入产品类型编号", trigger: "blur" }],
  productLoad: [{ required: true, message: "请输入产品载重", trigger: "blur" }],
  productModel: [{ required: true, message: "请输入产品车型", trigger: "blur" }],
  productDrive: [{ required: true, message: "请选择导航方式", trigger: "blur" }],
  productControl: [{ required: true, message: "请选择控制器", trigger: "blur" }],
  productChassis: [{ required: true, message: "请输入底盘信息", trigger: "blur" }]
};
const categorySelects = reactive([]);
const detailSelects = reactive([]);
onMounted(() => {
  getDetailProTypeSelect("移动机器人").then((res) => {
    if (res.code === "200") {
      selectvalue(res.data.cateSelects, categorySelects);
      selectvalue(res.data.detSelects, detailSelects);
    }
  });
});
const selectvalue = (datavalue, select) => {
  for (let i = 0; i < datavalue.length; i++) {
    select[i] = { id: i + 1, value: datavalue[i] };
  }
};
// 选择器的东西
const modelSelect = ref([{ value: "背负顶升" }, { value: "堆垛式" }, { value: "托盘搬运式" }, { value: "物流园区" }]);
const controlSelect = ref([{ value: "LGIM" }, { value: "NDC" }, { value: "科聪" }, { value: "易成" }]);
const driveSelect = ref([{ value: "激光导航" }, { value: "二维码导航" }, { value: "磁导航" }, { value: "激光+二维码导航" }, { value: "GPS+激光导航" }]);
const chassisSelect = ref([{ value: "双固定轮" }, { value: "四差速" }, { value: "单舵轮" }, { value: "双驱动桥" }, { value: "GPS+激光导航" }]);
const modelSearch = (queryString, cb) => {
  const results = queryString ? modelSelect.value.filter(createFilter(queryString)) : modelSelect.value;
  cb(results);
};
const controlSearch = (queryString, cb) => {
  const results = queryString ? controlSelect.value.filter(createFilter(queryString)) : controlSelect.value;
  cb(results);
};
const driveSearch = (queryString, cb) => {
  const results = queryString ? driveSelect.value.filter(createFilter(queryString)) : driveSelect.value;
  cb(results);
};
const chassisSearch = (queryString, cb) => {
  const results = queryString ? chassisSelect.value.filter(createFilter(queryString)) : chassisSelect.value;
  cb(results);
};
const createFilter = (queryString) => {
  return (restaurant) => {
    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
  };
};

const onSubmit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      postAddProduct(JSON.stringify(product.value.valueOf())).then((res) => {
        if (res.code === "200") {
          ElMessage.success("添加成功");
          tiaozhuan.push("/edit/products");
        } else {
          ElMessage.error("添加失败，请联系管理员");
        }
      });
    }
  });
};

</script>

<style scoped>


.button {
  padding-left: 200px;
}
</style>
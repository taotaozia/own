<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新产品</span></div>
    </template>
    <div class="table">
      <el-form :inline="true" :model="joint" :rules="rules" ref="form" label-width="auto" style="max-width: 85vw">
        <el-form-item label="关联产品类型" prop="categoryName">
          <el-select clearable v-model="joint.categoryName" style="width: 200px">
            <el-option
              v-for="item in categorySelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品详情页" prop="detailName">
          <el-select clearable v-model="joint.detailName" style="width: 200px">
            <el-option
              v-for="item in detailSelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="jointName">
          <el-input v-model="joint.jointName" />
        </el-form-item>
        <el-form-item label="物料编号" prop="jointBOM">
          <el-input v-model="joint.jointBOM" />
        </el-form-item>
        <el-form-item label="负责人" prop="jointDirector">
          <el-input v-model="joint.jointDirector" />
        </el-form-item>
        <el-form-item label="类型编号" prop="jointType">
          <el-input v-model="joint.jointType" />
        </el-form-item>
        <el-form-item label="负载" prop="jointLoad">
          <el-input v-model="joint.jointLoad" />
        </el-form-item>
        <el-form-item label="臂展（mm）" prop="jointArm">
          <el-input v-model="joint.jointArm" />
        </el-form-item>
        <el-form-item label="轴数" prop="jointAxis">
          <el-input v-model="joint.jointAxis" />
        </el-form-item>
        <el-form-item label="安全等级" prop="jointIPcode">
          <el-input v-model="joint.jointIPcode" />
        </el-form-item>
        <el-form-item label="行业标准" prop="jointIndustry">
          <el-input v-model="joint.jointIndustry" />
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/joint')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailProTypeSelect, getJoint, putUpdateJoint, putUpdateProduct } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();
const form = ref();
let joint = ref({});
const categorySelects = reactive([]);
const detailSelects = reactive([]);
const rules = {
  categoryName: [{ required: true, message: "请选择关联产品类型", trigger: "blur" }],
  productName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  productType: [{ required: true, message: "请输入产品类型编号", trigger: "blur" }],
  productLoad: [{ required: true, message: "请输入产品载重", trigger: "blur" }],
  productDrive: [{ required: true, message: "请选择导航方式", trigger: "blur" }],
  productControl: [{ required: true, message: "请选择控制器", trigger: "blur" }],
  productChassis: [{ required: true, message: "请输入底盘信息", trigger: "blur" }]
};

onMounted(() => {
  const id = localStorage.getItem("/edit/updateJoint");
  if (id) {
    getJoint(id).then((res) => {
      if (res.code === "200") {
        joint.value = res.data;
      }
    });
    getDetailProTypeSelect("关节机器人").then((res) => {
      if (res.code === "200") {
        selectValue(res.data.cateSelects, categorySelects);
        selectValue(res.data.detSelects, detailSelects);
      }
    });
  }
});
const selectValue = (dataValue, select) => {
  for (let i = 0; i < dataValue.length; i++) {
    select[i] = { id: i + 1, value: dataValue[i] };
  }
};
const onSubmit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      if (joint.value.detailName === undefined) {
        joint.value.detailName = "";
      }
      putUpdateJoint(JSON.stringify(joint.value.valueOf())).then((res) => {
        if (res.code === "200") {
          ElMessage.success("修改成功");
          tiaozhuan.push("/edit/joint");
        } else {
          ElMessage.error("更新失败，请联系管理员");
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
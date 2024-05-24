<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">关节机器人产品添加</span></div>
    </template>
    <div class="table">
      <el-form :inline=true :model="joint" :rules="rules" ref="form" label-width="auto" style="max-width: 85vw">
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
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { getDetailProTypeSelect, postAddJoint } from "@/api/http";

const tiaozhuan = useRouter();

let joint = ref({
  id: 0,
  jointId: "",
  categoryId: "",
  detailID: "",
  categoryName: "",
  detailName: "",
  jointName: "",
  jointBOM: "",
  jointDirector: "",
  jointType: "",
  jointLoad: "",
  jointArm: "",
  jointAxis: "",
  jointIPcode: "",
  jointIndustry: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});
const form = ref();
const rules = {
  categoryName: [{ required: true, message: "请选择关联产品类型", trigger: "blur" }],
  detailName: [{ required: true, message: "请选择关联产品详情页", trigger: "blur" }],
  jointName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  jointType: [{ required: true, message: "请输入产品类型编号", trigger: "blur" }],
  jointIPcode: [{ required: true, message: "请输入IP安全等级", trigger: "blur" }]
};
const categorySelects = reactive([]);
const detailSelects = reactive([]);
onMounted(() => {
  getDetailProTypeSelect("关节机器人").then((res) => {
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

const onSubmit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      postAddJoint(JSON.stringify(joint.value.valueOf())).then((res) => {
        if (res.code === "200") {
          ElMessage.success("添加成功");
          tiaozhuan.push("/edit/joint");
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
<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新产品</span></div>
    </template>
    <div class="table">
      <el-form :inline="true" :model="storage" :rules="rules" ref="form" label-width="auto" style="max-width: 85vw">
        <el-form-item label="关联产品类型" prop="categoryName">
          <el-select clearable v-model="storage.categoryName" style="width: 200px">
            <el-option
              v-for="item in categorySelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品详情页" prop="detailName">
          <el-select clearable v-model="storage.detailName" style="width: 200px">
            <el-option
              v-for="item in detailSelects"
              :key="item.id"
              :label="item.value"
              :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="storageName">
          <el-input v-model="storage.storageName" />
        </el-form-item>
        <el-form-item label="物料编号" prop="storageBOM">
          <el-input v-model="storage.storageBOM" />
        </el-form-item>
        <el-form-item label="负责人" prop="storageDirector">
          <el-input v-model="storage.storageDirector" />
        </el-form-item>
        <el-form-item label="类型编号" prop="storageType">
          <el-input v-model="storage.storageType" />
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/storage')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getDetailProTypeSelect, getStorage, putUpdateStorage } from "@/api/http";

const jieshou = useRoute();
const tiaozhuan = useRouter();
const form = ref();
let storage = ref({});
const categorySelects = reactive([]);
const detailSelects = reactive([]);
const rules = {
  categoryName: [{ required: true, message: "请选择关联产品类型", trigger: "blur" }],
  storageName: [{ required: true, message: "请输入产品名称", trigger: "blur" }],
  storageType: [{ required: true, message: "请输入产品类型编号", trigger: "blur" }]
};

onMounted(() => {
  const id = localStorage.getItem("/edit/updateStorage");
  if (id) {
    getStorage(id).then((res) => {
      if (res.code === "200") {
        storage.value = res.data;
      }
    });
    getDetailProTypeSelect("智能仓储").then((res) => {
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
      if (storage.value.detailName === undefined) {
        storage.value.detailName = "";
      }
      console.log(JSON.stringify(storage.value.valueOf()));
      putUpdateStorage(JSON.stringify(storage.value.valueOf())).then((res) => {
        if (res.code === "200") {
          ElMessage.success("修改成功");
          tiaozhuan.push("/edit/storage");
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
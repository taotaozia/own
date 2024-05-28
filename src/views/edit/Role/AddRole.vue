<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">添加新角色</span></div>
    </template>
    <div class="table">
      <el-form :inline=true :model="role" label-width="auto" style="max-width: 85vw">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" />
        </el-form-item>

        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/role')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { getDetailProTypeSelect, postAddRole, postAddStorage } from "@/api/http";

const tiaozhuan = useRouter();

let role = ref({
  id: 0,
  uuid: "",
  roleName: "",
  routerID: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});
const categorySelects = reactive([]);
const detailSelects = reactive([]);
onMounted(() => {
  getDetailProTypeSelect("智能仓储").then((res) => {
    if (res.code === "200") {

    }
  });
});


const onSubmit = async () => {
  await form.value.validate((vaild) => {
    if (vaild) {
      postAddRole(JSON.stringify(role.value.valueOf())).then((res) => {
        if (res.code === "200") {
          ElMessage.success("添加成功");
          tiaozhuan.push("/edit/role");
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
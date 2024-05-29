<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">添加新角色</span></div>
    </template>
    <div class="table">
      <el-form :inline=true :model="role" style="max-width: 85vw">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="role.roleName" />
        </el-form-item>
        <el-form-item label="路由ID" prop="routerID">
          <el-input v-model="role.routerID" disabled style="width: 50vw" />
        </el-form-item>
        <div class="treeMenu">
          <el-tree
            :data="menusData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="treeRef"
            @check="boxCheck"
            :render-after-expand="false"
          />
        </div>
        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/role')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { getRoleTree, postAddRole } from "@/api/http";

const tiaozhuan = useRouter();

let role = ref({
  id: 0,
  uuid: "",
  roleName: "",
  routerID: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});
let menusData = ref([]);
const defaultProps = { children: "children", label: "label" };
const treeRef = ref([]);
let treeData = ref([]);

onMounted(() => {
  getRoleTree().then((res) => {
    if (res.code === "200") {
      menusData.value = res.data;
      console.log(menusData);
    }
  });
});
const boxCheck = () => {
  let checkedKeys = treeRef.value.getCheckedKeys();
  let halfKeys = treeRef.value.getHalfCheckedKeys();
  treeData.value = checkedKeys.concat(halfKeys);
  role.value.routerID = treeData.value.join(",");
};

const onSubmit = async () => {
  postAddRole(JSON.stringify(role.value.valueOf())).then((res) => {
    if (res.code === "200") {
      ElMessage.success("添加成功");
      tiaozhuan.push("/edit/role");
    } else {
      ElMessage.error("添加失败，请联系管理员");
    }
  });
};

</script>

<style scoped>
.treeMenu {
  height: 30vh;
  overflow: auto;
}

.button {
  padding-top: 20px;
  padding-left: 200px;
}
</style>

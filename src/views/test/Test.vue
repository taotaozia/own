<template>
  <el-card class="box-card">
    <template #header>
      <div><span>角色管理</span></div>
    </template>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      ref="treeRef"
      @check="boxCheck"
    />
    <br />
    <el-input v-model="treeData" style="width: 240px" />
    <br />
    <el-button type="primary" @click="getTreeData">获取数据</el-button>

  </el-card>
</template>

<script setup>
import { ref } from "vue";

const data = [
  {
    id: 1, label: "Level one 1",
    children: [
      {
        id: 4, label: "Level two 1-1",
        children: [
          { id: 9, label: "Level three 1-1-1" },
          { id: 10, label: "Level three 1-1-2" }
        ]
      }
    ]
  },
  {
    id: 2, label: "Level one 2",
    children: [
      { id: 5, label: "Level two 2-1" },
      { id: 6, label: "Level two 2-2" }
    ]
  },
  {
    id: 3, label: "Level one 3",
    children: [
      { id: 7, label: "Level two 3-1" },
      { id: 8, label: "Level two 3-2" }
    ]
  }
];
const defaultProps = { children: "children", label: "label" };
const treeRef = ref([]);
let treeData = ref([]);
const role = ref({
  roleName: "测试",
  routerID: ""
});

const boxCheck = () => {
  let checkedKeys = treeRef.value.getCheckedKeys();
  let halfKeys = treeRef.value.getHalfCheckedKeys();
  treeData.value = checkedKeys.concat(halfKeys);
};
const getTreeData = () => {
  role.value.routerID = treeData.value.join(",");
  console.log(JSON.stringify(role.value));
};

</script>

<style></style>

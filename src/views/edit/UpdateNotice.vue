<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">更新系统消息</span></div>
    </template>
    <div class="table">
      <el-form :model="notice" label-width="auto" style="max-width: 1000px">
        <el-form-item label="系统消息名称" prop="title">
          <el-input v-model="notice.title" />
        </el-form-item>
        <el-form-item label="更新内容" prop="noticeText">
          <el-input v-model="notice.noticeText" type="textarea" :rows="10" />
<!--          <LogEdit :valueHtml="notice.noticeText" />-->
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="onSubmit">确认</el-button>
          <el-button @click="tiaozhuan.push('/edit/notice')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getNotice, putUpdateNotice } from "@/api/http";
import LogEdit from "@/views/Utils/LogEdit.vue";

const jieshou = useRoute();
const tiaozhuan = useRouter();

let notice = ref({});
onMounted(() => {
  const id = jieshou.query.id;
  if (id) {
    getNotice(id).then((res) => {
      if (res.code === "200") {
        notice.value = res.data;
      }
    });
  } else {
    tiaozhuan.push("/edit/notice");
  }
  console.log(notice);
  console.log(notice.value);
  console.log(notice.noticeText);
  console.log(notice.value.noticeText);
});
const onSubmit = () => {
  putUpdateNotice(JSON.stringify(notice.value.valueOf())).then((res) => {
    if (res.code === "200") {
      ElMessage.success("修改成功");
      tiaozhuan.push("/edit/notice");
    } else {
      ElMessage.error("更新失败，请联系管理员");
    }
  });
};
</script>

<style scoped>
.button {
  padding-left: 200px;
}
</style>
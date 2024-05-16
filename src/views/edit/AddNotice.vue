<template>
  <el-card class="box-card">
    <template #header>
      <div><span style="font-size: 20px">添加系统日志</span></div>
    </template>
    <div class="table">
      <el-form :model="notice" label-width="auto" style="max-width: 1000px">
        <el-form-item label="系统消息名称" prop="title">
          <el-input v-model="notice.title" />
        </el-form-item>
        <el-form-item label="更新内容" prop="noticeText">
          <el-input v-model="notice.noticeText" type="textarea" :rows="10" />
          <LogEdit :valueHtml="notice.noticeText"/>

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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { postAddNotice } from "@/api/http";
import LogEdit from "@/views/Utils/LogEdit.vue";

const jieshou = useRoute();
const tiaozhuan = useRouter();

let notice = ref({
  id: 0,
  uuid: "",
  userid: "system",
  finish: 0,
  title: "",
  noticeText: "",
  createtime: dayjs(new Date()).format("YYYY-MM-DD"),
  updatetime: dayjs(new Date()).format("YYYY-MM-DD")
});


const onSubmit = () => {
  postAddNotice(JSON.stringify(notice.value.valueOf())).then((res) => {
    if (res.code === "200") {
      ElMessage.success("添加成功");
      tiaozhuan.push("/edit/notice");
    } else {
      ElMessage.error("添加失败，请联系管理员");
    }
  });
};

</script>

<style scoped>


.button {
  padding-left: 200px;
}
</style>
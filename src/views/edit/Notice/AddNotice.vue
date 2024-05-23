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
          <div class="noticeEdit">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" />
            <Editor v-model="valueHtml" :defaultConfig="editorConfig"
                    @onCreated="handleCreated" style="height: 300px; overflow-y: hidden;" />
          </div>
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
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import { postAddNotice } from "@/api/http";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const jieshou = useRoute();
const tiaozhuan = useRouter();
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
let valueHtml = ref("");
const toolbarConfig = { excludeKeys: ["group-image", "group-video"] };
const editorConfig = { placeholder: "请输入内容..." };

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

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const onSubmit = () => {
  notice.value.noticeText = valueHtml.value;
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
.noticeEdit{
  width: 60vw;
  margin: 20px 0;
  border: 1px solid #000000;
}
</style>
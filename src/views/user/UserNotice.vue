<template>
  <div class="message">
    <el-card class="message-box">
      <template #header>
        <span>个人消息</span>
      </template>
      <div>
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="待办事项" name="first">
            <el-table
              :show-header="false"
              :data="hasData.value"
              style="height: 150px"
            >
              <el-table-column>
                <template v-slot="scope">
                  <el-button type="text" @click="openNotice(scope.row)">{{ scope.row.title }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="updatetime" width="200px" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已办事项" name="second">
            <el-table
              :show-header="false"
              :data="hadData.value"
              style="height: 150px"
            >
              <el-table-column>
                <template v-slot="scope">
                  <el-button type="text" @click="openNotice(scope.row)">{{ scope.row.title }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="updatetime" width="200px" />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { getUserNotices } from "@/api/http";
import { useStore } from "vuex";

const store = useStore();
const activeName = ref("");
const hasData = reactive([]);
const hadData = reactive([]);

onMounted(() => {
  getUserNotices(store.state.user.admin.uuid).then(res => {
    if (res.code === "200") {
      hasData.value = res.data.hasData;
      hadData.value = res.data.hadData;
    }
  });
});
</script>
<style scoped>

</style>
<template>
  <div class="main" style="height: 100%;width: 100%;margin-left: -1px">
    <div class="header">
      <Content></Content>
    </div>
    <div class="content">
      <div class="menu">
        <MyMenu></MyMenu>
      </div>
      <div class="wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import MyMenu from "@/views/Utils/MyMenu.vue";
import Content from "@/views/Utils/Content.vue";
</script>

<style lang="less" scoped>
.header {
  left: 0;
  top: 0;
  height: 8vh;
  min-height: 50px;
  overflow: hidden;
}

.content {
  //min-height: 650px;
  top: 8vh;
  height: 90vh;
  width: 100vw;
  display: flex;
}


.menu {
  width: 15vw;
  left: 0;
  top: 8vh;
  height: 92vh;
  //min-height: 650px;
  background: #545c64;
  overflow: auto;
}

.wrapper {
  top: 8vh;
  left: 15vw;
  width: 84.5vw;
  background: white;
  overflow: auto;
}
</style>

<template>
  <div class="err404">
    <div>
      <router-link :to="{ path: '/home' }" class="go-home">go home</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style>
.err404 {
  background: url(@/assets/notfound.jpg) no-repeat 0 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
}

.err404 h4 {
  font-size: 24px;
  color: #191919;
  padding-bottom: 16px
}

.err404 .go-home {
  margin: 36vh 48vw;
  width: 130px;
  height: 38px;
  background: #79c5fc;
  line-height: 38px;
  font-size: 16px;
  color: black;
  text-align: center;
  display: inline-block;
  border-radius: 2px
}
</style>
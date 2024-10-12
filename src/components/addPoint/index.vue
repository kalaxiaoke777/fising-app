<template>
  <view>
    <img @click="handlelAdd" src="@/static/fishing/添加.png" class="addPoint" />
  </view>
</template>

<script lang="ts" setup>
const handlelAdd = () => {

  uni.navigateTo({
    url: '/pages/fish/addFish'
  })
}
</script>

<style lang="scss" scoped>
.addPoint {
  position: fixed;
  bottom: 10px;
  right: 3px;
  width: 48px;
  height: 48px;
}
</style>
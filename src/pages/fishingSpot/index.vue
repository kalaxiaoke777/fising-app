<template>
    <view class="index">
        <image
            class="img"
            src="https://image.hnol.net/c/2015-05/04/11/20150504115230451-2285289.jpg"
            mode="scaleToFill"
        />
    </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted,reactive } from "vue";

import { onLoad } from "@dcloudio/uni-app";
onLoad((options) => {
  console.log(options);
});
// 组件挂载时加载初始数据
onMounted(() => {
    
});
</script>

<style lang="scss" scoped>
.index{
    img {
        width: 100%;
        height: 30vh;
    }
 
}
</style>
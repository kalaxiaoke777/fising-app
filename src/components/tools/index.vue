<template>
    <view class="tools">
        <image src="@/static/fishing/路况.png" class="toolImage" @click="changeTraffic"></image>
    </view>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';

// 声明接收的 traffic 属性
const props = defineProps({
    toggleTraffic: Function as PropType<() => void>
});

const changeTraffic = ()=>{
    props.toggleTraffic && props.toggleTraffic();
}
</script>

<style lang="scss" scoped>
.tools{
    width: 32px;
    height: 300px;
    background-color: rgba(255, 102, 0,0.4);
    border-radius: 10px;
    border: 1.5px solid #fff;
    position: fixed;
    right: 5px;
    top: 55px;
    padding: 3px;
    .toolImage{
        width: 32px;
        height: 24px;
    }
}
</style>
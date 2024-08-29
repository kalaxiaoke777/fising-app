<template>
    <view>
        <view class="top_bar">
            <view class="uni-title uni-common-pl top_bar_city">所在城市：{{ cityStore.cityName }}
            </view>
            <picker class="ipicker" mode="selector" :range="menuList" @change="onChange">
                <view class="picker childPicker">
                    选择排序: {{ selectedMenu }}
                </view>
            </picker>
        </view>
        <view>
            
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useCityStore } from "@/stores";
const cityStore = useCityStore();
const menuList  = ref(['离你最近', '热度最高', '价格最低'])
const selectedMenu = ref('离你最近')
const onChange = (e:any) => {
      selectedMenu.value = menuList.value[e.detail.value];
}
onMounted(() => {
    
})
</script>

<style lang="scss" scoped>
.top_bar{
    position: relative;
    height: 8vh;
    background-color: red;
    .top_bar_city{
        color: black;
        font-size: 12px;
        line-height: 8vh;
        margin-left: 6px;
    }
    .ipicker{
        position: absolute;
        top: 0;
        right: 10px;
        .childPicker{
            color: black;
            font-size: 12px;
            line-height: 8vh;
            margin-left: 6px;
        }
    }
}
</style>
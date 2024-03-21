<template>
    <view class="tools">
        <image src="@/static/fishing/路况.png" class="toolImage" @click="changeIsShow" :data-message="{message:'实时路况',type:'isTraffic',func:'toggleTraffic'}"></image>
        <image src="@/static/fishing/卫星地图.png" :style="{width:'32px',height:'32px'}" @click="changeIsShow" :data-message="{message:'卫星地图',type:'isEnableSatellite',func:'toggleEnableSatellite'}"></image>
    </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, type PropType } from 'vue';
const exeRet = ref("")
const title = ref("")
interface ToolsProps {
  func: any
}
// 定义组件接收的props
const props = defineProps({
  func: {
    type: Object as () => ToolsProps['func'],
    required: true
  }
});
const changeIsShow = (event: any)=>{  
    const message = event.currentTarget.dataset.message.message
    const type = event.currentTarget.dataset.message.type
    const func = event.currentTarget.dataset.message.func
    const funct = props.func[func]
    console.log(funct,func);
    
    funct && funct();
    uni.showToast({
          title: props.func.isShow[type] ? "打开"+message : "关闭"+message,
          success: (res) => {
            exeRet.value = "success:" + JSON.stringify(res)
          },
          fail: (res) => {
            exeRet.value = "fail:" + JSON.stringify(res)
          },
        })
        setTimeout(() => {
            uni.hideToast()
        }, 1000);
}
const changeEnableSatellite = ()=>{
    props.func.toggleEnableSatellite && props.func.toggleEnableSatellite();
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
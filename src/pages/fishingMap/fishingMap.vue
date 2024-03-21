<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          enable-3D = "true"
          :enable-overlooking = "isShow.isOverlooking"
          :enable-traffic = "isShow.isTraffic"
          :enable-satellite	="isShow.isEnableSatellite	"
          @tap="handleMapTap"
          style="width: 100%; height: 100vh"
          :latitude="coordinates[1]"
          :longitude="coordinates[0]"
          :circles="data.circles"
          :scale="data.scale"
        >
        </map>
      </view>
    </view>
  </view>
  <searchPoint />
  <addPoint />
  <Tools :func="{toggleTraffic,toggleEnableSatellite,isShow}"/>
</template>

<script lang="ts" setup>
import addPoint from "@/components/addPoint/index.vue";
import searchPoint from "@/components/search/index.vue";
import Tools from "@/components/tools/index.vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { onMounted } from "vue";
import { ref } from "vue";
const coordinates = ref([104, 35]);
const isShow = ref({
  isOverlooking:false,
  isTraffic:false,
  isEnableSatellite:false,
});
const data = ref({
  circles:[{
    latitude: 35,
    longitude: 104,
    fillColor: "#D9E6EF", //填充颜色
    color: "#A7B6CB", //描边的颜色 .
    radius: 1, //半径
    strokeWidth: 2 //描边的宽度
  }],
  scale:1
})
onMounted(()=>{
  console.log("onLoad");
  uni.authorize({
      scope: 'scope.userLocation',
      success() {
        // 用户已授权，可以获取地理位置信息
        uni.getLocation({
          type: 'wgs84', // 返回可以用于uni.openLocation的经纬度
          success: (res) => {
            coordinates.value[1] = res.latitude
			      coordinates.value[0] = res.longitude
            data.value.scale = 15
            data.value.circles = [{ //在地图上显示圆
              latitude: res.latitude,
              longitude: res.longitude,
              fillColor: "#D9E6EF", //填充颜色
              color: "#A7B6CB", //描边的颜色
              radius: 15, //半径
              strokeWidth: 2 //描边的宽度
            }]
          },
          fail: () => {
            // 获取地理位置失败的处理逻辑
            uni.showToast({
              title: '无法获取地理位置',
              icon: 'none'
            });
          }
        });
      },
      fail() {
        // 用户拒绝授权，你可以引导用户到设置页面开启权限
        uni.showToast({
          title: '请在系统设置中打开位置权限',
          icon: 'none'
        });
      }
    });
})

const toggleTraffic = () => {
  isShow.value.isTraffic = !isShow.value.isTraffic;
}
const toggleEnableSatellite = () => {
  isShow.value.isEnableSatellite = !isShow.value.isEnableSatellite;
}
const handleMapTap = (e: any) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
</style>
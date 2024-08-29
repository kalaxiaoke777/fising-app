<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          enable-3D = "true"
          :enable-overlooking = "isShow.isOverlooking"
          :enable-traffic = "isShow.isTraffic"
          :enable-satellite	="isShow.isEnableSatellite"
          @markertap="handleMarker"
          style="width: 100%; height: 100vh"
          :latitude="coordinates[1]"
          :longitude="coordinates[0]"
          :circles="data.circles"
          :scale="data.scale"
          :markers="data.markers"
          :show-location="true"
          :enable-indoorMap="true"
        >
          <cover-view slot="callout">
            <cover-view v-for="(item,index) in data.markers" :key="index">
              <cover-view class="customCallout" :marker-id="item.id">
                <cover-view class="content">
                  {{item.title}}
                  <cover-view>
                    图片位置
                    <cover-image :src="item.iconPath" style="width: 10px; height: 10px;"></cover-image>
                  </cover-view>
                </cover-view>
              </cover-view>
            </cover-view>
          </cover-view>
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
import { onMounted,onBeforeMount } from "vue";
import { useCityStore } from "@/stores";
import { ref } from "vue";
const cityStore = useCityStore();
const coordinates = ref([104.0431035344202,30.642415269320068]);
const isShow = ref({
  isOverlooking:false,
  isTraffic:false,
  isEnableSatellite:false,
});
const data = ref({
  circles:[{
    latitude: 30.642415269320068,
    longitude: 104.0431035344202,
    fillColor: "#D9E6EF", //填充颜色
    color: "#A7B6CB", //描边的颜色 .
    radius: 1, //半径
    strokeWidth: 2 //描边的宽度
  }],
  scale:14,
  markers:[
    {
      id:1,
      latitude: 30.642415269320068,
      longitude: 104.1431035344202,
      iconPath: "../../static/fishing/location.png",
      width: 32,
      height: 32,
      title: "钓点1",
      customCallout: {
        anchorY: 0, // Y轴偏移量
        anchorX: 1, // X轴偏移量
        display: "BYCLICK" // 一直展示
      },
    },
    {
      id:2,
      latitude: 30.642415269320068,
      longitude: 104.1831035344202,
      iconPath: "../../static/fishing/location.png",
      width: 32,
      height: 32,
      title: "钓点2",
      customCallout: {
        anchorY: 0, // Y轴偏移量
        anchorX: 1, // X轴偏移量
        display: "BYCLICK" // 一直展示
      },
    },
    {
      id:3,
      latitude: 30.542415269320068,
      longitude: 104.1431035344202,
      iconPath: "../../static/fishing/location.png",
      width: 32,
      height: 32,
      title: "钓点2",
      customCallout: {
        anchorY: 0, // Y轴偏移量
        anchorX: 1, // X轴偏移量
        display: "BYCLICK" // 一直展示
      },
    },
  ]
})

onBeforeMount(()=>{
  cityStore.setCityName("成都")
  console.log(cityStore.cityName);
  
  
  uni.authorize({
      scope: 'scope.userLocation',
      success() {
        // 用户已授权，可以获取地理位置信息
        uni.getLocation({
          type: 'wgs84', // 返回可以用于uni.openLocation的经纬度
          success: (res) => {
            console.log(1345,res);
            
            coordinates.value[1] = res.latitude
			      coordinates.value[0] = res.longitude
            data.value.scale = 15
            data.value.circles = [{ //在地图上显示圆
              latitude: res.latitude,
              longitude: res.longitude,
              fillColor: "#D9E6EF", //填充颜色
              color: "#A7B6CB", //描边的颜色
              radius: 1, //半径
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
const handleMarker = (e: any) => {
  console.log(e);
}
</script>

<style lang="scss" scoped>
.customCallout{
  width: 200px;
  height: 150px;
  background: rgba(255, 255, 255, 0.72); /* 背景色，可以调整透明度 */
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>
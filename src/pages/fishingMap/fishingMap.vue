<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          enable-3D = "true"
          :enable-overlooking = "true"
          :enable-traffic = "traffic"
          @tap="handleMapTap"
          style="width: 100%; height: 100vh"
          :latitude="coordinates[1]"
          :longitude="coordinates[0]"
        >
        </map>
      </view>
    </view>
  </view>
  <searchPoint />
  <addPoint />
  <Tools :toggleTraffic="toggleTraffic"/>
</template>

<script lang="ts" setup>
import addPoint from "@/components/addPoint/index.vue";
import searchPoint from "@/components/search/index.vue";
import Tools from "@/components/tools/index.vue";
import { ref } from "vue";
const coordinates = ref([104.0668, 30.5728]);
const traffic = ref(false);
const toggleTraffic = () => {
  traffic.value = !traffic.value;
}
const handleMapTap = (e: any) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
</style>
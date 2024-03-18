<template>
  <view>
    <view class="page-body">
      <view class="page-section page-section-gap">
        <map
          @tap="handleMapTap"
          style="width: 100%; height: 100vh"
          :latitude="coordinates[1]"
          :longitude="coordinates[0]"
        >
        </map>
      </view>
    </view>
  </view>
  <search />
</template>

<script lang="ts" setup>
import search from "@/components/search/index.vue";
import { ref } from "vue";
const coordinates = ref([104, 30]);
const handleMapTap = (e: any) => {
  console.log(e);
};
</script>

<style lang="scss" scoped>
</style>
netstat -an | find "10025"
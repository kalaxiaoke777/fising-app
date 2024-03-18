<template>
  <view>
    <input
      type="text"
      class="Finput"
      @input="inputChange"
      placeholder="搜索钓场"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const inputValue = ref("");
onMounted(() => {});
const inputChange = (e: any) => {
  inputValue.value = e.target.value;
};
</script>

<style lang="scss" scoped>
.Finput {
  position: fixed;
  width: 75vw;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 5px;
}
</style>
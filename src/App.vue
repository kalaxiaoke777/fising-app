<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
@import './wxcomponents/vant-weapp/dist/common/index.wxss';

checkbox .wx-checkbox-input.wx-checkbox-input-checked {
  background-color: #1485EE !important;
  border: 1px solid #1485EE !important;
}
</style>

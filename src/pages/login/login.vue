<template>
    <view class="login" >

        <van-button custom-style="width: 300px; border-radius: 19px; margin-bottom: 10px;" icon="wechat" color="#25da6f" custom-class="v-btn" @click="handelRegister">微信验证登录</van-button>
        <van-checkbox checked-color="#07c160" :value="checked" @change="onChange" >是否同意<a href="" class="link">用户须知</a>
        </van-checkbox>
    </view>
    <view class="img">
        <img src="/static/login/fish.png" alt="Fish Image" style="width: 100%; height: 100%; object-fit: cover;" />
    </view>

</template>

<script lang="ts" setup>
import { onMounted,ref } from 'vue';
const checked = ref(false)
const onChange = () =>{
    checked.value = ! checked.value;
    
    console.log(11,checked.value);
}
const handelRegister = () =>{
    console.log('微信验证登录');
}
onMounted(()=>{

})

</script>

<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    .link{
        position: relative;
        color: rgb(223, 119, 119);
    }
    .box{
        border-width: 10px; /* 设置边框宽度，增加粗细 */
    }
}
.img {
    width: 100vw;
    height: 100vh;
    position: absolute; /* 确保它能覆盖整个视口 */
    top: 0;
    left: 0;
    z-index: -1; /* 合适的 z-index 值 */
}

</style>
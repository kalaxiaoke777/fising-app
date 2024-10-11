<template>
    <view>
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V itop">
                <cover-image class="auth_img" :src="image_url">
                </cover-image>
                <view>
                    欢迎
                </view>
            </view>
            <view class="flex-item flex-item-V icenter">
                <view class="text">
                    我的收藏
                    <img src="@/static/my/我的收藏.png" class="iimg">
                </view>
                <view class="text" @click="hanldeSet">
                    设置
                    <img src="@/static/my/设置.png" class="iimg">
                </view>
                <button v-if="isLogin" class="btn" @click="handleLogin">登录</button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app';
import { onBeforeMount } from 'vue';
import { onMounted, ref } from 'vue';
import config from '../../../config'
const { API_BASE_URL } = config
const image_url = ref(`https://img1.baidu.com/it/u=2875963390,1058465864&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800`);
const isLogin = ref(false)
const handleLogin = () => {
    // 跳转到授权登录页面
    uni.navigateTo({
        url: '/pages/login/login'
    });
}
const hanldeSet = () => {

}
const getToken = () => {
    // 获取存储的用户信息
    const userStorage = uni.getStorageSync('register');

    // 处理存储项不存在或无法解析的情况
    let userToken;
    try {
        userToken = JSON.parse(userStorage || '{}'); // 如果 userStorage 是 null 或 undefined，解析成空对象
    } catch (e) {
        console.error('Failed to parse user storage:', e);
        userToken = {}; // 解析失败时也用空对象
    }

    // 检查 token 是否存在
    if (userToken && userToken.token) {
        isLogin.value = false; // 已登录
    } else {
        isLogin.value = true; // 未登录
    }
}
onMounted(() => {
})
onShow(() => {
    getToken()
})
</script>

<style lang="scss" scoped>
.itop {
    height: 40vh;
    position: relative;
    background-color: rgb(127, 125, 125);

    .auth_img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}

.icenter {
    .text {
        position: relative;
        width: 100%;
        height: 38px;
        border-bottom: 1px solid #ccc;
        line-height: 38px;
        font-size: 16px;
        color: #333;
        background-color: #fff;
        box-sizing: border-box;
        padding-left: 10px;
        padding-right: 10px;

        .iimg {
            position: absolute;
            top: 3px;
            right: 5px;
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-left: 10px;
        }
    }

    .text:hover {
        background-color: #eee;
    }

    .btn {
        position: fixed;
        width: 100%;
        bottom: 0;
        background-color: rgb(232, 129, 129);
    }
}
</style>
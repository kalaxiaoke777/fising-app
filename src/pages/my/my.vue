<template>
    <view>
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V itop">
                <cover-image class="auth_img" src="/static/my/deflateAvatar.png">
                </cover-image>
            </view>
            <view class="flex-item flex-item-V icenter">
                <view class="text">
                    我的收藏
                    <img src="@/static/my/我的收藏.png" class="iimg">
                </view>
                <view class="text">
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

const isLogin = ref(false)
const handleLogin = () => {
    // 跳转到授权登录页面
    uni.navigateTo({
        url: '/pages/login/login'
    });
}
const getToken = () => {

    uni.getStorageInfo({
        success: function (res) {
            const keys = res.keys;
            const keyExists = keys.includes('user');
            if (keyExists) {
                const userToken = JSON.parse(uni.getStorageSync('user'))
                if (userToken.token) {
                    isLogin.value = false
                } else {
                    isLogin.value = true
                }
            } else {
                isLogin.value = true
            }
        },
        fail: function (error) {
            isLogin.value = true
        }
    });

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
    background-color: pink;

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
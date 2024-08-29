<template>
    <view>
        <view class="uni-flex uni-column">
            <view class="flex-item flex-item-V itop">
                <cover-image class="auth_img" src="../../static/logo.png">
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
                <button class="btn">退出登录</button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

onMounted(() => {    
    uni.login({
        provider: 'weixin',
        success: res => {
            console.log('登录成功，code：', res.code);
            // 此处可以将 code 发送到后台进行登录或注册操作
        },
        fail: err => {
            console.error('登录失败：', err);
        }
    });
    uni.getUserInfo({
        provider: 'weixin',
        success: res => {
            console.log('用户信息：', res);
            // 此处可以将用户信息发送到后台进行注册或登录操作
        },
        fail: err => {
            console.error('获取用户信息失败：', err);
        }
    });
})
</script>

<style lang="scss" scoped>
.itop{
    height: 40vh;
    position: relative;
    background-color: pink;
    .auth_img{
        width: 100px; 
        height: 100px; 
        object-fit: cover; 
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
}
.icenter{
    .text{
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
        .iimg{
            position: absolute;
            top: 3px;
            right: 5px;
            width: 32px;
            height: 32px;
            vertical-align: middle;
            margin-left: 10px;
        }
    }
    .text:hover{
        background-color: #eee;
    }
    .btn{
        position: fixed;
        width: 100%;
        bottom: 0;
        background-color: rgb(232, 129, 129);
    }
}
</style>
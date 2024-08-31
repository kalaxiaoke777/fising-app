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
                <button class="btn" @click="handleLogin">登录</button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

const handleLogin = ()=>{
    // 跳转到授权登录页面
    uni.navigateTo({
        url: '/pages/login/login'
    });
}
onMounted(() => {    
    // 首先登录微信
    uni.login({
        provider: 'weixin',
        success: function (loginRes) {
            if (loginRes.code) {
                console.log('登录凭证:', loginRes.code);
                // 登录成功后检查授权状态
                uni.getSetting({
                    success: function (settingRes) {
                        if (settingRes.authSetting['scope.userInfo']) {
                            // 用户已经授权，获取用户信息
                            uni.getUserInfo({
                                provider: 'weixin',
                                success: function (infoRes) {
                                    console.log('用户信息:', infoRes.userInfo);
                                    // infoRes.userInfo 可能包括 nickname、avatarUrl、gender、province 等
                                },
                                fail: function (infoErr) {
                                    console.error('获取用户信息失败:', infoErr);
                                }
                            });
                        } else {
                            console.log('用户未授权，请引导用户进行授权');
                            // 在这里可以提示用户进行授权
                        }
                    },
                    fail: function (settingErr) {
                        console.error('获取设置失败:', settingErr);
                    }
                });
            } else {
                console.error('登录失败:', loginRes.errMsg);
            }
        },
        fail: function (loginErr) {
            console.error('登录失败:', loginErr);
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
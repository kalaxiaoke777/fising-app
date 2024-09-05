<template>
    <view class="login">

        <van-button custom-style="width: 300px; border-radius: 19px; margin-bottom: 10px;" icon="wechat" color="#25da6f"
            custom-class="v-btn" @click="handelRegister">微信验证登录</van-button>
        <van-checkbox checked-color="#07c160" :value="checked" @change="onChange">是否同意<a href="" class="link">用户须知</a>
        </van-checkbox>
    </view>
    <view class="img">
        <img :src="image_url" alt="Fish Image" style="width: 100%; height: 100%; object-fit: cover;" />
    </view>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ApiService from "../../utils/request";
import config from "../../../config"
import { useRegisterStore } from '../../stores/index';  // 根据实际路径调整
import { useUserStore } from '../../stores/index'; // 确保路径正确

const userStore = useUserStore();
const token = ref('');

const { weCallback, API_BASE_URL } = config
const image_url = ref(`${API_BASE_URL}/static/fish.png`);
const updateToken = () => {
    userStore.setUserName(token.value);
};

const clearToken = () => {
    userStore.clearUserName();
};
const registerStore = useRegisterStore();

const updateUserInfo: Function = (session_key: string, openId: string) => {
    registerStore.setCityName(session_key, openId);
}
const checked = ref(false)
const onChange: Function = () => {
    checked.value = !checked.value;

    console.log(11, checked.value);
}
const login = (url: string, code: string) => {
    ApiService.get(url, { code: code })
        .then((response: any) => {
            if (response.code === 50001) {
                updateUserInfo(response.session_key, response.openid)
                uni.navigateTo({
                    url: '/pages/login/register'
                })
            } else {
                // 判断是否存在用户，如果存在则返回信息，持久化
                token.value = response.token
                updateToken()
                uni.switchTab({
                    url: '/pages/my/my'
                })
            }
            console.log('数据获取成功:', response);
            // 处理成功的响应数据
        })
        .catch(error => {
            console.error('请求失败:', error);
            // 处理请求错误
        });
}
const handelRegister = () => {
    if (!checked.value) {
        uni.showToast({
            title: '请先勾选协议',
            icon: 'none'
        })
        return
    }
    // 首先登录微信
    uni.login({
        provider: 'weixin',
        success: function (loginRes) {
            if (loginRes.code) {
                console.log('登录凭证:', loginRes.code);
                if (checked) {
                    login(weCallback, loginRes.code)
                }

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
}
onMounted(() => {

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

    .link {
        position: relative;
        color: rgb(223, 119, 119);
    }

    .box {
        border-width: 10px;
        /* 设置边框宽度，增加粗细 */
    }
}

.img {
    width: 100vw;
    height: 100vh;
    position: absolute;
    /* 确保它能覆盖整个视口 */
    top: 0;
    left: 0;
    z-index: -1;
    /* 合适的 z-index 值 */
}
</style>
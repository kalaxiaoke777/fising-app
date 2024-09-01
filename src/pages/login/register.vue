<template>
    <view class="register">
        <form @submit="formSubmit" @reset="formReset" class="c-register">
            <view class="uni-form-item uni-column">
                <view class="title">用户注册</view>
                <input class="uni-input" name="user" placeholder="请输入用户名" />
            </view>
            <view class="uni-form-item uni-column">
                <input class="uni-input" name="number" placeholder="请输入手机号码" />
            </view>
            <view class="uni-btn-v">
                <button size="mini" type="primary" form-type="submit">注册</button>
                <button size="mini" form-type="reset">清空</button>
            </view>
        </form>
    </view>
    <view class="img">
        <img src="/static/login/fish.png" alt="Fish Image" style="width: 100%; height: 100%; object-fit: cover;" />
    </view>

</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import ApiService from "../../utils/request";
import config from "../../../config"
import { useRegisterStore } from '../../stores/index'; 
const registerStore = useRegisterStore();
const userName = ref('')
const phoneNumber = ref('')
// 中国手机号码正则表达式
const regexChina = /^1[3-9]\d{9}$/;

const formSubmit = (v: any) => {
    // 从事件对象中提取表单数据
    const { number, user } = v.target.value;

    // 获取用户输入
    const phoneNumber = number;
    const userName = user;

    // 验证用户输入
    if (!userName) {
        uni.showModal({
            content: '请填写用户名',
            showCancel: false
        });
        return;
    }

    if (!phoneNumber) {
        uni.showModal({
            content: '请填写电话号',
            showCancel: false
        });
        return;
    }

    // 手机号码格式验证
    const isValidPhoneNumber = regexChina.test(phoneNumber);

    if (!isValidPhoneNumber) {
        uni.showModal({
            content: '电话号格式不正确！',
            showCancel: false
        });
        return;
    }
    console.log(69, registerStore.openid, registerStore.session_key);
    
    const data:object = {
        "username": userName,
        "phoneNumber": phoneNumber,
        "openId": registerStore.openid,
        "userKey": registerStore.session_key
    }
    ApiService.post(config.weRegister, data)
        .then((response: any) => {
            if (response.code === 50001) {
                // 不存在则直接弹出填入手机号进行注册
                uni.navigateTo({ url: '/pages/login/register' });
            } else {
                // 判断是否存在用户，如果存在则返回信息，持久化
            }
            console.log('数据获取成功:', response);
            // 处理成功的响应数据
        })
        .catch(error => {
            console.error('请求失败:', error);
            // 处理请求错误
        });
}
const formReset = () => {
    phoneNumber.value = ''
    userName.value = ''
}
onMounted(()=>{
    
})


</script>

<style lang="scss" scoped>
.register {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

    .c-register {
        display: flex;
        justify-content: center;
        width: 80vw;
        height: 23vh;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        color: #fff;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        .uni-input {
            width: 100%;
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.9)
        }

        .title {
            font-size: 20px;
            margin-bottom: 10px;
            margin-top: 10px;
            font-weight: bold;
            color: black;
        }

        .uni-btn-v {
            display: flex;
            /* 启用 flexbox 布局 */
            gap: 10px;

            /* 按钮之间的间距，可根据需要调整 */
            button {
                width: 40%;
                text-align: center;
            }
        }
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
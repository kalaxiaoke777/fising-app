<template>
    <view>
        <uni-forms ref="form" :modelValue="state.formData" :rules="state.rules">
            <uni-forms-item label="昵称" required name="name">
                <uni-easyinput type="text" v-model="state.formData.username" placeholder="请输入姓名"></uni-easyinput>
            </uni-forms-item>
            <uni-forms-item label="电话" required name="phoneNumber">
                <uni-easyinput type="text" v-model="state.formData.phonenumber" placeholder="请输入电话"></uni-easyinput>
            </uni-forms-item>
        </uni-forms>
        <button class="button" @click="submit">修改</button>
    </view>
</template>

<script lang="ts" setup>
import { onLoad, onReady } from '@dcloudio/uni-app';
import { onBeforeMount } from 'vue';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import config from "../../../config";
import { checkChinaPhoneNumber } from "@/utils/tools";
const { API_BASE_URL } = config
const form = ref()
const state = reactive({
    formData: {
        username: 'qwe',
        phonenumber: "13",
    },

    rules: {
        name: {
            rules: [{
                required: true,
                errorMessage: '姓名不能为空'
            }]
        },
        phoneNumber: {
            rules: [{
                required: true,
                errorMessage: '电话不能为空'
            },
            {
                validateFunction: (rule: any, value: string | any, data: any, callback: (arg0: string) => void) => {
                    console.log(value, data);

                    callback('请填写符合中国手机号码格式的电话')
                    if (!checkChinaPhoneNumber(value)) {
                        callback('请填写符合中国手机号码格式的电话')
                    }
                    return true
                }
            }]
        },
    }
})
const submit = () => {
    uni.showLoading()
    form.value.validate().then((res: any) => {
        uni.hideLoading()
        console.log('表单数据信息：', res);
    }).catch((err: any) => {
        uni.hideLoading()
        console.log('表单错误信息：', err);
    })
}
onReady(() => {
    // form.value.setRules(state.rules)
})
onMounted(() => {
})

</script>

<style lang="scss" scoped></style>
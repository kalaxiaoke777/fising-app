<template>
    <view>
        <uni-forms ref="form" :modelValue="state.formData">
            <uni-forms-item label="name" required name="hobby">
                <input type="text" v-model="state.username" placeholder="请输入姓名" >
            </uni-forms-item>
            <uni-forms-item label="phonenumber" required name="hobby">
                <input type="text" v-model="state.username" placeholder="请输入电话" >
            </uni-forms-item>
        </uni-forms>
        <button class="button" @click="submit">校验表单</button>
    </view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { onBeforeMount } from 'vue';
import { onMounted, ref } from 'vue';
import { reactive } from 'vue';
import config from "../../../config";
const { API_BASE_URL } = config
const form = ref()
const state = reactive({
    formData: {

    },
    username:'',
    phonenumber:""
})
const submit = () => {
    form.value.validate().then(res => {
        console.log('表单数据信息：', res);
    }).catch(err => {
        console.log('表单错误信息：', err);
    })
}
onMounted(() => {
})

</script>

<style lang="scss" scoped></style>
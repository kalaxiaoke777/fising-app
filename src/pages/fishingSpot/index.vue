<template>
    <view class="product-detail">
        <image class="product-image" src="https://img2.ali213.net/picfile/News/2021/12/04/584_2021120431219961.jpg"
            mode="scaleToFill" />
        <view class="product-info">
            <text class="product-name">鱼塘名称：{{ state.data.name }}</text>
        </view>
        <view class="product-info">
            <text class="product-price">￥{{ state.data.price }}</text>
        </view>
        <view class="product-info">
            <text class="product-price">描述{{ state.data.description }}</text>
        </view>
        <view class="product-info">
            <uni-section title="评价" subTitle="使用 readonly 属性设置组件只读" type="line" padding>
                <uni-rate :readonly="true" :value="state.data.rating" />
            </uni-section>
        </view>

        <button class="buy-button" @click="buyNow">立即前往</button>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getOpenid } from "@/utils/tools";
import ApiService from "@/utils/request";
import config from "../../../config";
const { getFishSingle } = config;
const state = reactive({
    data: {}
})
const render = (id: string, is_public: boolean) => {
    const openid = getOpenid()
    ApiService.get(getFishSingle, { "user_id": openid, id, "is_public": is_public })
        .then((response: any) => {
            console.log(response.data);

            state.data = response.data
        })
        .catch(error => {
            console.error('请求失败:', error);
        });
}
onLoad((options: any) => {
    render(options.id, options.is_public)
});
// 这里可以定义一些数据和方法
const buyNow = () => {
    // 处理购买逻辑
    console.log("购买按钮被点击");
};

// 组件挂载时加载初始数据
onMounted(() => {
    // 这里可以加载商品数据
});
</script>

<style lang="scss" scoped>
.product-detail {
    padding: 16px;
}

.product-image {
    width: 100%;
    height: 50vh; // 根据需要修改高度
}

.product-info {
    margin-top: 16px;
}

.product-name {
    font-size: 24px;
    font-weight: bold;
}

.product-price {
    font-size: 20px;
    color: #FF5722; // 或您选择的自定义颜色
    margin-top: 8px;
}

.product-description {
    font-size: 16px;
    margin-top: 8px;
    color: #555; // 文本颜色
}

.buy-button {
    margin-top: 16px;
    background-color: #FF5722;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    width: 100%;
}

.buy-button:hover {
    background-color: #E64A19; // 悬停时按钮颜色
}
</style>
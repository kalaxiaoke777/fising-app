<template>
    <view class="product-detail">
        <image class="product-image" src="https://img2.ali213.net/picfile/News/2021/12/04/584_2021120431219961.jpg"
            mode="scaleToFill" />
        <view class="product-info">
            <text class="product-name">鱼塘名称：{{ state.data.name }}</text>
            <uni-fav :checked="state.fav" class="favBtn" @click="favClick" />
        </view>
        <view>
            <text>价格：</text>
            <text class="product-price">￥{{ state.data.price === null ? 0 : state.data.price }}</text>
            <text style="margin-left: 6px; font-size: 13px;">鱼塘类型：</text>
            <text style="font-size: 13px; color:brown">{{ getPondTypeInChinese(state.data.pond_type) }}</text>
        </view>
        <uni-section class="mb-10" title="评价" type="line" padding>
            <uni-rate :readonly="true" :value="state.data.rating === 0 ? 1 : state.data.rating" />
        </uni-section>
        <uni-section title="鱼种" type="line" padding>
            <view class="example-body fish_species clearfix">
                <view class="tag-view fish_species_f" v-for="(item, index) in state.data.fish_species">
                    <view class="fish_species_item">
                        {{ item }}
                    </view>
                </view>
            </view>
        </uni-section>
        <uni-section title="详情" type="line" padding>
            <textarea style="height: 50px;">{{ state.data.description }}</textarea>
        </uni-section>
        <uni-section title="营业时间" type="line" padding>
            <view class="time-container">
                <view class="time">{{ state.data.opening_time }}</view>
                <view class="time">{{ state.data.closing_time }}</view>
            </view>
        </uni-section>
        <button class="buy-button" @click="buyNow">立即前往</button>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getOpenid, getPondTypeInChinese } from "@/utils/tools";
import ApiService from "@/utils/request";
import config from "../../../config";
const { getFishSingle } = config;
const state = reactive({
    data: {},
    fav: false
})
const favClick = () => {
    state.fav = !state.fav
}
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
    uni.openLocation({
        latitude: 30.567138471438266,
        longitude: 104.08220290022344,
        scale: 18,
    })
};

// 组件挂载时加载初始数据
onMounted(() => {
    // 这里可以加载商品数据
});
</script>

<style lang="scss" scoped>
.clearfix::after {
    content: "";
    display: table;
    clear: both;
}

.product-detail {
    background-color: rgb(209, 205, 205);
    padding: 16px;

    .fish_species {
        display: flex;
        width: 100%;
        /* 容器宽度 */
        flex-wrap: wrap;
        /* 使每行多个item在同一行 */
        // justify-content: space-between; /* 在项之间平均分配空间 */
        align-items: center;
        /* 垂直居中对齐 */
        box-sizing: border-box;
        padding: 8px;

        .fish_species_f {
            margin: 4px;

            .fish_species_item {
                flex: 1;
                /* 每个item平均分配空间 */
                box-sizing: border-box;
                /* 确保padding和border不会影响宽度 */
                padding: 7px;
                background-color: rgb(172, 226, 9);
                border-radius: 6px;

            }
        }

    }

    .time-container {
        text-align: center;
        /* 使时间居中对齐 */
        font-family: 'Arial', sans-serif;
        /* 设置字体 */
        font-size: 1.5em;

        /* 设置字体大小 */
        .time {
            display: inline-block;
            /* 使两个时间框在同一行 */
            padding: 5px 10px;
            /* 设置内边距 */
            background-color: #f0f0f0;
            /* 设置背景颜色 */
            border: 1px solid #ccc;
            /* 设置边框 */
            border-radius: 5px;
            /* 设置圆角 */
            margin: 0 5px;
            /* 设置外边距 */
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
            /* 设置阴影 */
        }
    }


}

.product-image {
    width: 100%;
    height: 30vh; // 根据需要修改高度
}

.product-info {
    margin-top: 16px;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
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
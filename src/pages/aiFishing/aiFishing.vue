<template>
    <view class="ai-analysis-page">
        <!-- 标题 -->
        <view class="title">AI鱼塘选择</view>
        <uni-section title="请选择侧重点" type="line">
            <uni-data-select v-model="state.value" :localdata="state.range" @change="change"></uni-data-select>
        </uni-section>
        <!-- 提交按钮 -->
        <button @click="submitQuestion" class="submit-button">提交问题</button>

        <!-- AI分析结果显示区域 -->
        <uni-card v-if="state.isResult" padding="0" spacing="0">
            <template v-slot:cover>
                <view class="custom-cover">
                    <image src="https://p1.itc.cn/q_70/images03/20231031/a152de60b36a41159767457b406d2e98.png"
                        class="cover-image" mode="aspectFill" />
                    <view class="cover-content">
                        <text class="uni-subtitle uni-white">坤坤鱼塘</text>
                    </view>
                    <text class="uni-subtitle uni-white distance">距离您：一坤km</text>
                </view>
            </template>
            <view slot="actions" class="card-actions no-border">
                <button class="mini-btn" type="primary">点击跳转</button>
                <button class="mini-btn" type="primary">重新预测</button>
            </view>
        </uni-card>
    </view>
</template>

<script lang="ts" setup>
import { useAI } from "@/hooks/aiFishingHook";
const { state, submitQuestion, change } = useAI();
</script>

<style lang="scss" scoped>
.ai-analysis-page {
    .title {
        font-size: 19px;
        margin-bottom: 20px;
        font-weight: bold;
        text-align: center;
        /* 居中 */
    }

    .submit-button {
        margin-top: 10px;
    }

    .custom-cover {
        flex: 1;
        flex-direction: row;
        position: relative;

        .distance {
            position: absolute;
            top: 5px;
            right: 3px;
            color: #fff;
            font-size: 12px;
            background-color: rgba($color: #000000, $alpha: 0.4);
        }

        .cover-image {
            flex: 1;
            background-size: cover;
            width: 100%;
            height: 150px;
        }

        .cover-content {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40px;
            background-color: rgba($color: #000000, $alpha: 0.4);
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 15px;
            font-size: 14px;
            color: #fff;
        }
    }

    .card-actions {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        height: 45px;
        border-top: 1px #eee solid;
    }
}
</style>
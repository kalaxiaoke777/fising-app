<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map id="map" enable-3D="true" :enable-overlooking="isShow.isOverlooking"
                    :enable-traffic="isShow.isTraffic" :enable-satellite="isShow.isEnableSatellite"
                    @markertap="handleMarker" style="width: 100%; height: 100vh" :latitude="coordinates[1]"
                    :longitude="coordinates[0]" :scale="data.scale" :markers="data.publicMarkers" :show-location="true"
                    :enable-indoorMap="true" @regionchange="regionchange">
                    <cover-view slot="callout">
                        <cover-view v-for="(item, index) in data.publicMarkers" :key="index">
                            <cover-view class="customCallout" :marker-id="item.id">
                                <cover-view class="cover-view">钓点名称：{{ item.title }}</cover-view>
                                <cover-view class="cover-view">钓点类型：{{ getPondTypeInChinese(item.pond_type)
                                    }}</cover-view>
                                <cover-view class="cover-view">价格：{{ item.price ? item.price : '0' }} 元/次</cover-view>
                                <cover-view class="cover-view">鱼种：{{ fishList(item.fish_species) }}</cover-view>
                                <cover-view class="cover-view">开门时间：{{ item.opening_time }}</cover-view>
                                <cover-view class="cover-view">关门时间：{{ item.closing_time }}</cover-view>
                                <cover-view class="cover-view">评价：{{ item.rating }}</cover-view>
                                <cover-view class="cover-view">描述：{{ item.description }}</cover-view>
                            </cover-view>
                        </cover-view>
                    </cover-view>
                </map>
            </view>
        </view>
    </view>
    <searchPoint :func="{ ensurePublic, ensurePrivate, state }" />
    <uni-fab style="bottom: 10px;" ref="fab" :pattern="state.pattern" :content="state.content" horizontal="right"
        direction="vertical" @trigger="trigger" />
    <view class="myCheckbox">
        <view>
            公开:
        </view>
        <checkbox borderColor="red" color="red" style="transform:scale(0.9)" class="custom-checkbox"
            :checked="state.checkedPublic" @click="onChangePublic"></checkbox>
        <view>
            私人:
        </view>
        <checkbox borderColor="#a1d66a" color="blue" style="transform:scale(0.9)" class="custom-checkbox"
            :checked="state.checkedPrivate" @click="onChangePrivate"></checkbox>
        <view>
            收藏:
        </view>
        <checkbox borderColor="#a1d66a" color="yellow" style="transform:scale(0.9)" :disabled="isFavoriteDisabled()"
            class="custom-checkbox" :checked="checkedFavorite()" @click="onChangeFavorite"></checkbox>
    </view>
    <view class="addFish" v-if="state._addFish">
        请滑动屏幕确认点位！
        <button size="mini" type="primary" class="btn" @click="handleAddFish">确定</button>
        <button size="mini" type="default" class="btn" @click="cancelAddFish">取消</button>
    </view>
</template>

<script lang="ts" setup>
import addPoint from "@/components/addPoint/index.vue";
import searchPoint from "@/components/search/index.vue";
import Tools from "@/components/tools/index.vue";
import useMap from "../../hooks/useMap"

const { data, coordinates, isShow, state, trigger, handleAddFish, cancelAddFish, addFishState, addFish, regionchange, ensurePublic, ensurePrivate, getPondTypeInChinese, onChangePublic, onChangePrivate, onChangeFavorite, toggleTraffic, toggleEnableSatellite, handleMarker, fishList, isFavoriteDisabled, checkedFavorite } = useMap();
</script>

<style lang="scss" scoped>
$background-color: #f3e7e7; // 背景色
$border-color: #bfff00; // 边框色
$border-radius: 8px; // 圆角
$padding: 10px; // 内边距
$shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 更强的阴影
$title-font-size: 16px; // 标题字体大小
$text-font-size: 14px; // 正文字体大小
$title-color: #333333; // 标题颜色
$text-color: #666666; // 文字颜色
$marker-prefix-color: #007BFF; // 标签前缀颜色
$max-width: 400px; // 最大宽度

.uni-fab--rightBottom {
    bottom: 10px;
}

.myCheckbox {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    left: 5px;
    bottom: 1%;
    padding: 5px;
    border-radius: 2px solid rgba(230, 230, 9, 0.85);
    background-color: rgba(247, 186, 142, 0.8);
}

.addFish {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    width: 80%;
    height: 30px;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20%;
    padding: 5px;
    border-radius: 2px solid rgba(230, 230, 9, 0.85);
    background-color: rgba(247, 186, 142, 0.8);

    .btn {
        font-size: 12px;
        // width: 50px;
        // height: 25px;
    }
}


.customCallout {
    background-color: rgba(255, 192, 203, 0.85);
    border: 2px solid $border-color; // 更厚的边框
    border-radius: $border-radius;
    padding: $padding;
    box-shadow: $shadow;
    font-family: 'Roboto', sans-serif; // 更现代的字体
    max-width: $max-width;

    .view {
        width: 32px;
        height: 32px;
        position: absolute;
        right: 10px;
        top: 2px;
        z-index: 999929;
    }

    // 增加鼠标悬停效果
    &:hover {
        transform: translateY(-5px); // 提升效果
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); // 更强的阴影
    }

    // 每一行的样式
    .cover-view {
        margin-bottom: 6px; // 增加底部间距
        line-height: 1.6; // 增加行高
        position: relative;
        padding-left: 20px; // 为每一行添加左内边距

        // 添加标签前缀
        &::before {
            content: '• '; // 使用点作为前缀
            color: $marker-prefix-color;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        // 修改文字颜色
        &:nth-child(even) {
            color: $text-color;
            background-color: rgba(0, 0, 0, 0.08); // 行的背景色交替
            padding: 8px; // 增加内边距
        }
    }
}
</style>
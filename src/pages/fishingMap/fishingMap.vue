<template>
    <view>
        <view class="page-body">
            <view class="page-section page-section-gap">
                <map enable-3D="true" :enable-overlooking="isShow.isOverlooking" :enable-traffic="isShow.isTraffic"
                    :enable-satellite="isShow.isEnableSatellite" @markertap="handleMarker"
                    style="width: 100%; height: 100vh" :latitude="coordinates[1]" :longitude="coordinates[0]"
                    :scale="data.scale" :markers="data.markers" :show-location="true"
                    :enable-indoorMap="true">
                    <cover-view slot="callout">
                        <cover-view v-for="(item, index) in data.markers" :key="index">
                            <cover-view class="customCallout" :marker-id="item.id">
                                <cover-view class="cover-view">钓点名称：{{ item.title }}</cover-view>
                                <cover-view class="cover-view">钓点类型：{{ getPondTypeInChinese(item.pond_type)  }}</cover-view>
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
    <searchPoint />
    <addPoint />
    <Tools :func="{ toggleTraffic, toggleEnableSatellite, isShow }" />
</template>

<script lang="ts" setup>
import addPoint from "@/components/addPoint/index.vue";
import searchPoint from "@/components/search/index.vue";
import Tools from "@/components/tools/index.vue";
import { onLoad, onShow, onLaunch } from "@dcloudio/uni-app";
import { onMounted, onBeforeMount,ref } from "vue";
import { useCityStore } from "@/stores";
import config from "../../../config"
import ApiService from "@/utils/request"
const {API_BASE_URL,getFish} = config

// 定义类型
const English_to_chinese: { [key: string]: string } = {
    wild: "野塘",
    black_pit: "黑坑",
    natural: "天然",
    happy: "欢乐"
};
const req = ApiService
const cityStore = useCityStore();
const coordinates = ref([0, 0]);
const isShow = ref({
    isOverlooking: false,
    isTraffic: false,
    isEnableSatellite: false,
});


const fishList = (fish: string[]): string => {
    return fish.join(', ');
};
const getPondTypeInChinese = (pond_type: string): string => {
    return English_to_chinese[pond_type] || '未知类型';
};

const transformData = (locations:any) => {
    return locations.map((location:any) => ({
        id: location.pond_id,
        latitude: location.latitude,
        longitude: location.longitude,
        iconPath: "../../static/fishing/location.png", // 你可以根据需要修改这个路径
        width: 32,
        height: 32,
        title: location.name,
        description: location.description,
        rating: location.rating,
        price: location.price,
        pond_type: location.pond_type,
        phone_number: location.phone_number,
        opening_time: location.opening_time,
        closing_time: location.closing_time,
        fish_species: location.fish_species,
        is_public: location.public,
        customCallout: {
            anchorY: 0,
            anchorX: 1,
            display: "ALWAYS"
        }
    }));
};


const renderFish = (url: string, params: object) => {
    ApiService.get(url, params)
        .then((response: any) => {
            console.log(response);
            const locations = response.data;
            data.value.markers = transformData(locations); // 转换并更新markers
        })
        .catch(error => {
            console.error('请求失败:', error);
        });
}
onLoad(() => {
    console.log("jinru1");
    
    renderFish(getFish, {"isPublic":1})
})
const data = ref({
    scale: 14,
    markers: []
})

onBeforeMount(() => {
    cityStore.setCityName("成都")
    console.log(cityStore.cityName);


    uni.authorize({
        scope: 'scope.userLocation',
        success() {
            // 用户已授权，可以获取地理位置信息
            uni.getLocation({
                type: 'wgs84', // 返回可以用于uni.openLocation的经纬度
                success: (res) => {
                    console.log(1345, res);

                    coordinates.value[1] = res.latitude
                    coordinates.value[0] = res.longitude
                    data.value.scale = 15
                },
                fail: () => {
                    coordinates.value = [104.0431035344202, 30.642415269320068];
                    // 获取地理位置失败的处理逻辑
                    uni.showToast({
                        title: '无法获取地理位置',
                        icon: 'none'
                    });
                }
            });
        },
        fail() {
            // 用户拒绝授权，你可以引导用户到设置页面开启权限
            uni.showToast({
                title: '请在系统设置中打开位置权限',
                icon: 'none'
            });
        }
    });
})

const toggleTraffic = () => {
    isShow.value.isTraffic = !isShow.value.isTraffic;
}
const toggleEnableSatellite = () => {
    isShow.value.isEnableSatellite = !isShow.value.isEnableSatellite;
}
const handleMapTap = (e: any) => {
    console.log(e);
};
const handleMarker = (e: any) => {
    console.log(e);
}
</script>

<style lang="scss" scoped>
// 定义一些基本的变量
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

.customCallout {
    background: linear-gradient(135deg, #f3e7e7 0%, #f8d3d3 100%); // 渐变背景
    border: 2px solid $border-color; // 更厚的边框
    border-radius: $border-radius;
    padding: $padding;
    box-shadow: $shadow;
    font-family: 'Roboto', sans-serif; // 更现代的字体
    max-width: $max-width;
    transition: transform 0.3s, box-shadow 0.3s; // 动画效果

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
            background-color: rgba(0, 0, 0, 0.02); // 行的背景色交替
            padding: 8px; // 增加内边距
        }
    }
}
</style>
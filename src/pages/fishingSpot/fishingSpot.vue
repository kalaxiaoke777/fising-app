<template>
    <view>
        <view class="top_bar">
            <view class="uni-title uni-common-pl top_bar_city">所在城市：{{ cityStore.cityName }}</view>
            <picker class="ipicker" mode="selector" :range="menuList" @change="onChange">
                <view class="picker childPicker">
                    选择排序: {{ selectedMenu }}
                </view>
            </picker>
        </view>
        <scroll-view
            scroll-y
            @scrolltolower="loadMoreData"
            :style="{ height: '92vh' }"
            :upper-threshold="50"
            :lower-threshold="50"
        >
            <view v-for="item in items" :key="item.id" class="item">
                {{ item.name }} <!-- 替换成你实际的数据展示 -->
            </view>
            <view v-if="loading" class="loading">
                加载中...
            </view>
            <view v-if="!hasMore" class="no-more">
                没有更多数据了
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useCityStore } from "@/stores";
import config from "../../../config"
const {getFishList, API_BASE_URL} = config

const cityStore = useCityStore();
const menuList = ref(['离你最近', '热度最高', '价格最低', '只看私人', '只看收藏']);
const selectedMenu = ref('离你最近');
const items = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const page = ref(1); // 当前的页码
import ApiService from "../../utils/request";

const onChange = (e: any) => {
    selectedMenu.value = menuList.value[e.detail.value];
    resetData(); // 重置数据
}

const loadMoreData = async () => {
    if (loading.value || !hasMore.value) return; // 防止重复请求

    loading.value = true;

    try {
        ApiService.get(getFishList, { "isPublic": 1 })
            .then((response: any) => {
                if (response) {
                    console.log(response);
                    items.value = response.results
                }
                else {
                    console.log(response);
                }

            })
            .catch(error => {
                console.error('请求失败:', error);
            });
        
        // if (response.data && response.data.data) {
        //     items.value.push(...response.data.data);
        //     page.value += 1; // 增加当前页码

        //     // 如果返回数据少于请求的数量，则没有更多数据
        //     if (response.data.data.length < 10) {
        //         hasMore.value = false;
        //     }
        // }
    } catch (error) {
        console.error("请求数据失败：", error);
    } finally {
        loading.value = false;
    }
}

// 初始加载数据
const initialLoad = () => {
    resetData();
    // loadMoreData();
}

const resetData = () => {
    items.value = [];
    page.value = 1;
    hasMore.value = true;
    initialLoad();
}

// 组件挂载时加载初始数据
onMounted(() => {
    loadMoreData();
});
</script>

<style lang="scss" scoped>
.top_bar {
    position: relative;
    height: 8vh;
    background-color: red;

    .top_bar_city {
        color: black;
        font-size: 12px;
        line-height: 8vh;
        margin-left: 6px;
    }

    .ipicker {
        position: absolute;
        top: 0;
        right: 10px;

        .childPicker {
            color: black;
            font-size: 12px;
            line-height: 8vh;
            margin-left: 6px;
        }
    }
}
.item {
    /* 你的item样式 */
}

.loading {
    text-align: center;
    margin: 20px 0;
}

.no-more {
    text-align: center;
    margin: 20px 0;
}
</style>
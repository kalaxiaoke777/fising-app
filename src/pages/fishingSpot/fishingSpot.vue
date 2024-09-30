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
            :refresher-enabled="state.refresherEnabled"
            :refresher-threshold="5"
            :refresher-triggered="state.isRefresher"
            :scroll-y="true"
            @scrolltolower="loadMoreData"
            @refresherrefresh="refresherrefresh"
            @refresherpulling="refresherpulling"
            :style="{ height: '92vh' }"
            :upper-threshold="50"
            :lower-threshold="50"
        >
            <view v-for="item in items" :key="item.id" class="item">
                <uni-section title="卡片+列表" type="line">
                    <uni-card padding="0" spacing="0">
                        <template v-slot:cover>
                            <view class="custom-cover">
                                <image
                                    src="https://image.hnol.net/c/2015-05/04/11/20150504115230451-2285289.jpg"
                                    class="cover-image" 
                                    mode="aspectFill"
                                />
                                <view class="cover-content">
                                    <text class="uni-subtitle uni-white">{{item.name}}</text>
                                </view>
                            </view>
                        </template>
                        <uni-list>
                            <uni-list-item title="今日新闻" showArrow></uni-list-item>
                            <uni-list-item title="今日新闻" showArrow></uni-list-item>
                        </uni-list>
                        <view slot="actions" class="card-actions no-border">
                            <view class="card-actions-item" @click="location({id:item.pond_id,longitude:item.longitude,latitude:item.latitude})">
                                <uni-icons type="location" size="18" color="#999"></uni-icons>
                                <text class="card-actions-item-text">位置</text>
                            </view>
                            <view class="card-actions-item" @click="actionsClick('收藏')">
                                <uni-icons type="heart" size="18" color="#999"></uni-icons>
                                <text class="card-actions-item-text">收藏</text>
                            </view>
                            <view class="card-actions-item" @click="detile(item.pond_id)">
                                <uni-icons type="more" size="18" color="#999"></uni-icons>
                                <text class="card-actions-item-text">详情</text>
                            </view>
                        </view>
                    </uni-card>
                </uni-section>
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
import { onMounted, ref, onUnmounted,reactive } from "vue";
import { useCityStore } from "@/stores";
import config from "../../../config"
const {getFishList, API_BASE_URL} = config
import ApiService from "../../utils/request";
const cityStore = useCityStore();


const actionsClick = (e:any) =>{

}
const detile = (id:any) =>{    
    uni.redirectTo({
        url: `/pages/fishingSpot/index?id=${id}`
    })
}
const location = (opt:{id:number,longitude:number,latitude:number}) =>{ 
    uni.setStorageSync('option',{id:opt.id, lon:opt.longitude, lat:opt.latitude,})   
    uni.switchTab({
        url: `/pages/fishingMap/fishingMap`
    })
}
const state = reactive({
    isRefresher: false,
    refresherEnabled:true
})
const menuList = ref(['离你最近', '热度最高', '价格最低', '只看私人', '只看收藏']);
const selectedMenu = ref('离你最近');
const items = ref([]);
const loading = ref(false);
const hasMore = ref(true);
const page = ref(1); // 当前的页码


const refresherrefresh = (e:any) =>{
    setTimeout(() => {
        state.isRefresher = false;
    }, 1000);
    
}
const refresherpulling = (e:any) =>{
    state.isRefresher = true;
    
}
const onChange = (e: any) => {
    selectedMenu.value = menuList.value[e.detail.value];
    resetData(); // 重置数据
}

const loadMoreData = async () => {
    if (loading.value || !hasMore.value) return; // 防止重复请求

    loading.value = true;

    try {
        await ApiService.get(getFishList, { "isPublic": 1 })
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
    background-color: rgba(18, 123, 77, 0.6);

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
.container {
    width: 100%;
    height: 20%;
}

.custom-cover {
    flex: 1;
    flex-direction: row;
    position: relative;
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
.card-actions-item {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.card-actions-item-text {
    font-size: 12px;
    color: #666;
    margin-left: 5px;
}

.no-border {
    border-width: 0;
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
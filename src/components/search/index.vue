<template>
    <view class="input">
        <input @input="changeInput" type="text" class="Finput" v-model="state.searchQuery" placeholder="搜索钓场" />
        <ul v-if="state.isShow" class="myUl">
            <li class="myLi" v-for="location in state.locations" :key="location.id">
                <span class="name">{{ location.name }}</span>
                <span class="info">距离您:{{ location.distance }} km</span>
            </li>
        </ul>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue';
import config from "../../../config"

const { API_BASE_URL, searchFish } = config
const state = reactive({
    searchQuery: '',
    isShow: false,
    locations: [
        { id: 1, name: '东湖钓场', distance: 12 },
        { id: 2, name: '西湖钓场', distance: 13 },
        { id: 3, name: '南湖钓场', distance: 11 },
        { id: 4, name: '北湖钓场', distance: 14 },
    ]
})

let timeoutId: number | null = null;

const onChange = (e: any) => {
    console.log(e);

};
const changeInput = (e: any) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery === "") {
        state.isShow = false;
    } else {
        state.isShow = true;
    }
    timeoutId = setTimeout(() => {
        console.log(state.searchQuery);

    }, 800);
};

</script>

<style lang="scss" scoped>

.input {
    position: fixed;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 75vw;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;

    .Finput {
        width: 72vw;
        border: 2px solid rgba(255, 192, 203, 0.85);
        border-radius: 10px;
        padding: 5px;
    }

    .myUl {
        width: 71.5vw;
        background-color: rgba(255, 192, 203, 0.85);

        .myLi {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 6px;
            border-bottom: 1px solid rgb(117, 113, 113);

            .name {
                // flex: 1;
            }

            .info {
                font-size: 12px;
                margin-left: 10px;
                color: #888;
            }
        }

        .myLi:hover {
            background-color: rgba(230, 230, 9, 0.85);
        }
    }
}
</style>
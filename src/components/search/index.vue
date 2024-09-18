<template>
    <view class="input">
        <input @input="changeInput" type="text" class="Finput" v-model="state.searchQuery" placeholder="搜索钓场" />
        <ul v-if="state.isShow" class="myUl">
            <li v-if="state.locations.length === 0" class="myLi">
                <span class="info">没有找到相关钓场</span>
            </li>
            <li @click="hanldePop(location)" class="myLi" v-for="location in state.locations" :key="location.id">
                <span class="name">{{ location.name }}</span>
                <span class="info">距离您:{{ location.distance }} km</span>
            </li>
        </ul>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import config from "../../../config";
import ApiService from "../../utils/request";
interface ToolsProps {
  func: any
}
// 定义组件接收的props
const props = defineProps({
  func: {
    type: Object as () => ToolsProps['func'],
    required: true
  }
});
const { API_BASE_URL, searchFish } = config;
const state = reactive({
    searchQuery: '',
    isShow: false,
    locations: []
});

let timeoutId: number | null = null;



const hanldePop = (location:{is_public:boolean,longitude:Number,latitude:Number,id:number}) =>{
    if (location.is_public) {
        props.func.ensurePublic(location.longitude, location.latitude, location.id)
    }else{
        props.func.ensurePrivate(location.longitude, location.latitude, location.id)
    }
    state.isShow = false
    state.searchQuery = ''
}

const onChange = (e: any) => {
    console.log(e);
};

const getOpenid = () => {
    const register = uni.getStorageSync('register');
    try {
        return JSON.parse(register || '{}').openid;
    } catch (e) {
        return '';
    }
};

const getLocation = async (data: any) => {
    try {
        const response = await ApiService.get(searchFish, data);
        return response;
    } catch (error) {
        return { data: [] }; // 确保返回数据格式一致
    }
};

const fetchData = async (name: string) => {
    const openId = getOpenid();
    const data: any = { name };
    if (openId) {
        data['id'] = openId;
    }
    const response = await getLocation(data);
    return response.data;
};

const changeInput = async (e: any) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery === "") {
        state.isShow = false;
        state.locations = []; // 清空结果
    } else {
        state.isShow = true;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(async () => {
            try {
                const res = await fetchData(state.searchQuery);
                state.locations = res.length > 0 ? res : []; // 赋值给 locations
            } catch (error) {
                console.error("Error fetching data:", error);
                state.locations = []; // 出错时也清空结果
            }
        }, 500);
    }
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
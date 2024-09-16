// useMap.ts
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useRegisterStore } from '../stores/index';
import { useCityStore } from "@/stores";
import ApiService from "@/utils/request";
import config from "../../config";

const { API_BASE_URL, getFish } = config;
const registerStore = useRegisterStore();

const English_to_chinese: { [key: string]: string } = {
    wild: "野塘",
    black_pit: "黑坑",
    natural: "天然",
    happy: "欢乐"
};

const useMap = () => {
    const data = ref({
        scale: 14,
        publicMarkers: [],
        privateMarkers: []
    });
    const getPondTypeInChinese = (pond_type: string): string => {
        return English_to_chinese[pond_type] || '未知类型';
    };

    const coordinates = ref([0, 0]);
    const isShow = ref({
        isOverlooking: false,
        isTraffic: false,
        isEnableSatellite: false
    });

    const state = reactive({
        checkedPublic: true,
        checkedPrivate: false,
        checkedFavorite: false
    });

    const getOpenid = () => {
        const register = uni.getStorageSync('register');
        try {
            return JSON.parse(register || '{}').openid;
        } catch (e) {
            console.error('Failed to parse user storage:', e);
            return '';
        }
    };

    const transformData = (locations: any) => {
        return locations.map((location: { pond_id: any; latitude: any; longitude: any; is_public: any; name: any; description: any; rating: any; price: any; pond_type: any; phone_number: any; opening_time: any; closing_time: any; fish_species: any; }) => ({
            id: location.pond_id,
            latitude: location.latitude,
            longitude: location.longitude,
            iconPath: location.is_public ? "../../static/fishing/private.png" : "../../static/fishing/public.png",
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
            is_public: location.is_public,
            customCallout: {
                anchorY: 0,
                anchorX: 1,
                display: "BYCLICK"
            }
        }));
    };

    const renderFish = (url: string, params: any) => {
        ApiService.get(url, params)
            .then((response: any) => {
                const locations = response.data;
                data.value.publicMarkers = data.value.publicMarkers.concat(transformData(locations));
            })
            .catch(error => {
                console.error('请求失败:', error);
            });
    };

    const onChangePublic = (e: any) => {
        state.checkedPublic = !state.checkedPublic;
        if (state.checkedPublic) {
            renderFish(getFish, { "isPublic": 1 });
        } else {
            data.value.publicMarkers = data.value.publicMarkers.filter((marker: any) => marker.is_public !== true);
        }
    };

    const onChangePrivate = (e: any) => {
        let openid = getOpenid();
        state.checkedPrivate = !state.checkedPrivate;
        if (state.checkedPrivate) {
            renderFish(getFish, { "isPublic": 0, "openid": openid });
        } else {
            data.value.publicMarkers = data.value.publicMarkers.filter((marker: any) => marker.is_public !== false);
        }
    };

    const onChangeFavorite = () => {
        let openid = getOpenid();
        state.checkedFavorite = !state.checkedFavorite;
        if (state.checkedFavorite) {
            renderFish(getFish, { "isPublic": 0, "openid": openid });
        } else {
            data.value.publicMarkers = data.value.publicMarkers.filter((marker: any) => marker.is_public !== false);
        }
    };

    const toggleTraffic = () => {
        isShow.value.isTraffic = !isShow.value.isTraffic;
    };

    const toggleEnableSatellite = () => {
        isShow.value.isEnableSatellite = !isShow.value.isEnableSatellite;
    };

    const handleMapTap = (e: any) => {
        console.log(e);
    };

    const handleMarker = (e: any) => {
        console.log(e);
    };

    onMounted(() => {
        renderFish(getFish, { "isPublic": state.checkedPublic ? 1 : 0 });
    });

    onBeforeMount(() => {
        const cityStore = useCityStore();
        cityStore.setCityName("成都");
        console.log(cityStore.cityName);

        uni.authorize({
            scope: 'scope.userLocation',
            success() {
                uni.getLocation({
                    type: 'wgs84',
                    success: (res) => {
                        coordinates.value[1] = res.latitude;
                        coordinates.value[0] = res.longitude;
                        data.value.scale = 15;
                    },
                    fail: () => {
                        coordinates.value = [104.0431035344202, 30.642415269320068];
                        uni.showToast({
                            title: '无法获取地理位置',
                            icon: 'none'
                        });
                    }
                });
            },
            fail() {
                uni.showToast({
                    title: '请在系统设置中打开位置权限',
                    icon: 'none'
                });
            }
        });
    });
    const fishList = (fish: string[]): string => {
        return fish.join(', ');
    };

    return {
        data,
        coordinates,
        isShow,
        state,
        onChangePublic,
        onChangePrivate,
        onChangeFavorite,
        toggleTraffic,
        toggleEnableSatellite,
        handleMapTap,
        handleMarker,
        getPondTypeInChinese,
        fishList
    };
};

export default useMap;
// useMap.ts
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useRegisterStore } from '../stores/index';
import { useCityStore } from "@/stores";
import ApiService from "@/utils/request";
import config from "../../config";

const { API_BASE_URL, getFish, searchFish } = config;
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
        return locations.map((location: { pond_id: any; latitude: any; longitude: any; is_public: any; name: any; description: any; rating: any; price: any; pond_type: any; phone_number: any; opening_time: any; closing_time: any; fish_species: any; is_favorite: any }) => ({
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
            is_favorite: location.is_favorite,
            customCallout: {
                anchorY: 0,
                anchorX: 1,
                display: "ALWAYS"
            }
        }));
    };

    const favortite = (params: any) => {
        ApiService.get(searchFish, params)
            .then((response: any) => {
                data.value.publicMarkers.forEach((marker: any) => {
                    if (marker.id === params.fishing_pond) {
                        marker.is_favorite = !marker.is_favorite;
                    }

                })
            })
            .catch(error => {
                console.error('请求失败:', error);
            });
    }
    const handleFavorite = (pond_id: string) => {
        const openid = getOpenid();
        console.log(openid);
        
        if (!openid) {
            uni.showModal({
                title: '提示',
                content: '请先登录',
                showCancel: false,
            });
            uni.navigateTo({ url: '/pages/my/my' });
            return;
        }
        favortite({ user: openid, fishing_pond: pond_id, favortite: true });

    }
    const renderFish = (url: string, params: any, isFavorite: boolean) => {
        ApiService.get(url, params)
            .then((response: any) => {
                const locations = response.data;
                if (isFavorite) {
                    const locationIds = new Set(locations.map((item: any) => item.pond_id));

                    data.value.publicMarkers.forEach((marker: any) => {
                        if (locationIds.has(marker.id)) {
                            marker.iconPath = "../../static/fishing/favorite.png"
                            marker.is_favorite = true
                        }
                    });
                }
                else {
                    data.value.publicMarkers = data.value.publicMarkers.concat(transformData(locations));
                }

            })
            .catch(error => {
                console.error('请求失败:', error);
            });
    };

    const onChangePublic = (e: any) => {
        state.checkedPublic = !state.checkedPublic;
        if (state.checkedPublic) {
            renderFish(getFish, { "isPublic": 1 }, false);
        } else {
            data.value.publicMarkers = data.value.publicMarkers.filter((marker: any) => marker.is_public !== true);
        }
    };

    const onChangePrivate = (e: any) => {
        let openid = getOpenid();
        state.checkedPrivate = !state.checkedPrivate;
        if (state.checkedPrivate) {
            renderFish(getFish, { "isPublic": 0, "openid": openid }, false);
        } else {
            data.value.publicMarkers = data.value.publicMarkers.filter((marker: any) => marker.is_public !== false);
        }
    };

    const onChangeFavorite = () => {
        let openid = getOpenid();
        state.checkedFavorite = !state.checkedFavorite;
        if (state.checkedFavorite) {
            renderFish(getFish, { "openid": openid, "isFavorite": 1, }, true);
        } else {
            data.value.publicMarkers.forEach((marker: any) => {
                marker.iconPath = marker.is_public ? "../../static/fishing/private.png" : "../../static/fishing/public.png"
                marker.is_favorite = false;
            })
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
        renderFish(getFish, { "isPublic": state.checkedPublic ? 1 : 0 }, false);
    });

    onBeforeMount(() => {
        const cityStore = useCityStore();
        cityStore.setCityName("成都");

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

    const isFavoriteDisabled = () => {
        checkedFavorite()
        return !(state.checkedPrivate || state.checkedPublic);
    }
    const checkedFavorite = () => {
        if (state.checkedPrivate === false && state.checkedPublic === false){
            state.checkedFavorite = false;
            return false;
        }
      };

    return {
        data,
        coordinates,
        isShow,
        state,
        checkedFavorite,
        onChangePublic,
        onChangePrivate,
        onChangeFavorite,
        toggleTraffic,
        toggleEnableSatellite,
        handleMapTap,
        handleMarker,
        getPondTypeInChinese,
        fishList,
        handleFavorite,
        isFavoriteDisabled
    };
};

export default useMap;
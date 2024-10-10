// useMap.ts
import { ref, reactive, onMounted, onBeforeMount,onBeforeUnmount } from 'vue';
import { useRegisterStore } from '../stores/index';
import { useCityStore } from "@/stores";
import ApiService from "@/utils/request";
import config from "../../config";
import {getOpenid, createUUID} from "@/utils/tools";
import { onShow } from "@dcloudio/uni-app";
const { getFish, searchFish, addFishURL } = config;
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
        privateMarkers: [],

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
        checkedFavorite: false,
        _addFish:false,
        onloadLocation: [0, 0],
        addMarker:{},
        fishState: {
            name: '',
            number: '',
            poundType: "",
            price: "",
            slider: "",
            type: "",
            fishType: []
        },
        content: [
            {
                iconPath: '/static/logo.png',
                selectedIconPath: '/static/logo.png',
                text: '相册',
                active: false
            }
        ],
        pattern: {
            color: '#7A7E83',
            backgroundColor: '#fff',
            selectedColor: '#007AFF',
            buttonColor: '#007AFF',
            iconColor: '#fff'
        },
    });



    const transformData = (locations: any) => {
        return locations.map((location: { pond_id: any; latitude: any; longitude: any; is_public: any; name: any; description: any; rating: any; price: any; pond_type: any; phone_number: any; opening_time: any; closing_time: any; fish_species: any; is_favorite: any,uuid:string }) => ({
            id: location.pond_id,
            uuid: location.uuid,
            latitude: location.latitude,
            longitude: location.longitude,
            iconPath: location.is_public ? "../../static/fishing/public.png" : "../../static/fishing/private.png",
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
                display: "BYCLICK"
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
        if (!openid) {
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

        if (!openid) {
            state.checkedPrivate = false
            return;
        }
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
        if (!openid) {
            return;
        }
        if (state.checkedFavorite) {
            renderFish(getFish, { "openid": openid, "isFavorite": 1, }, true);
        } else {
            data.value.publicMarkers.forEach((marker: any) => {
                marker.iconPath = marker.is_public ? "../../static/fishing/public.png" : "../../static/fishing/private.png"
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
        uni.$on('addFish', (data) => {
            console.log(205, data);

            addFish(data)
        })

    });
    onShow(() => {
        let option = uni.getStorageSync('option');
        if (option !== '') {
            ensurePublic(option.lon, option.lat, option.id)
            uni.removeStorageSync('option');
        }
    })
    const getLocation = () => {
        uni.authorize({
            scope: 'scope.userLocation',
            success() {
                uni.getLocation({
                    type: 'wgs84',
                    success: (res) => {
                        coordinates.value[1] = res.latitude;
                        coordinates.value[0] = res.longitude;
                        state.onloadLocation = [res.longitude, res.latitude];
                        data.value.scale = 15;
                    },
                    fail: () => {
                        coordinates.value = [104.0431035344202, 30.642415269320068];
                        state.onloadLocation = [104.0431035344202, 30.642415269320068];
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
    };
    onBeforeMount(() => {
        const cityStore = useCityStore();
        cityStore.setCityName("成都");
        getLocation();
        const intervalId = setInterval(getLocation, 120000); // 60000ms = 60s
        onBeforeUnmount(() => {
            clearInterval(intervalId);
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
        if (state.checkedPrivate === false && state.checkedPublic === false) {
            state.checkedFavorite = false;
            return false;
        }
    };
    const ensurePublic = (lon: number, lat: number, id: number) => {
        if (state.checkedPublic === false) {
            state.checkedPublic = true;
            renderFish(getFish, { "isPublic": 1 }, false);
        }
        let targetItem: any = data.value.publicMarkers.find((item: any) => item.id === id);
        if (targetItem) {
            let iconPath = targetItem.iconPath
            targetItem.iconPath = "../../static/fishing/icon.png"
            setTimeout(() => {
                targetItem.iconPath = iconPath
            }, 900);

        }
        data.value.scale = 16
        coordinates.value = [lon, lat];
    }
    const ensurePrivate = (lon: number, lat: number, id: number) => {
        const openid = getOpenid()
        if (!openid) {
            return;
        }
        if (state.checkedPrivate === false) {
            state.checkedPrivate = true;
            renderFish(getFish, { "isPublic": 0, "openid": openid }, false);
        }
        let targetItem: any = data.value.publicMarkers.find((item: any) => item.id == id);
        if (targetItem) {
            let iconPath = targetItem.iconPath
            targetItem.iconPath = "../../static/fishing/icon.png"
            setTimeout(() => {
                targetItem.iconPath = iconPath
            }, 900);

        }
        data.value.scale = 16
        coordinates.value = [lon, lat];
    }
    const regionchange = (e: any) => {
        if (e.type === "end") {
            if (Object.keys(state.addMarker).length !== 0) {
                let targetItem: any = data.value.publicMarkers.find((item: any) => item.id == state.addMarker.id);
                targetItem.longitude = e.target.centerLocation.longitude
                targetItem.latitude = e.target.centerLocation.latitude;
                state.addMarker.longitude = e.target.centerLocation.longitude           
                state.addMarker.latitude = e.target.centerLocation.latitude           
            }
            coordinates.value = [e.target.centerLocation.longitude, e.target.centerLocation.latitude];
        }


    }
    const addFishState = () => {
        console.log(data);
    }
    const addFish = (_data: any) => {
        var uuid = createUUID();
        
        const maps = uni.createMapContext('map', this)

        const markers =
        {
            id: uuid,
            uuid: uuid,
            user_id:'',
            latitude: coordinates.value[1],
            longitude: coordinates.value[0],
            iconPath: _data.type === "public" ? "../../static/fishing/public.png" : "../../static/fishing/private.png",
            width: 32,
            height: 32,
            title: _data.name,
            description: _data.text,
            rating: _data.slider,
            price: _data.price,
            pond_type: _data.poundType,
            phone_number: _data.number,
            opening_time: _data.startTime,
            closing_time: _data.endTime,
            fish_species: _data.fishType === undefined ? [] : _data.fishType,
            is_public: _data.type === "public" ? true : false,
            is_favorite: false,
            customCallout: {
                anchorY: 0,
                anchorX: 1,
                display: "BYCLICK"
            },
        }
        state.addMarker = markers
        console.log(343,state.addMarker);
        state._addFish = true

        data.value.publicMarkers.push(markers)
    }
    const handleAddFish = async () => {
        const openid:string = getOpenid()
        let fish:any = state.addMarker
        if (!fish.is_public) {
            fish.user_id = openid
        }
        fish.location = {
            "type": "Point",
            "coordinates": [fish.longitude, fish.latitude]           
        }
        fish.fish_species = [...new Set(fish.fish_species.map((item:any) => item.value))];
        await ApiService.post(addFishURL, fish)
        .then((response: any) => {
            const locations = response.data;
            if (response.code === 200) {
                uni.showToast({
                    title: '添加成功',
                    icon:'success'
                });
                state._addFish = false
                state.addMarker = {}
            }else{
                uni.showToast({
                    title: '添加失败',
                    icon: 'none'
                });
                state._addFish = false
            }

        })
        .catch(error => {
            uni.showToast({
                title: error,
                icon: 'none'
            });
            state._addFish = false
        });
        
    }
    const cancelAddFish = () => {
        state._addFish = false
        data.value.publicMarkers.pop()
    }
    const trigger = () => {
        console.log("rraer");
        
    }

    return {
        data,
        coordinates,
        isShow,
        state,
        trigger,
        handleAddFish,
        cancelAddFish,
        regionchange,
        ensurePublic,
        ensurePrivate,
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
        isFavoriteDisabled,
        addFish,
        addFishState
    };
};

export default useMap;
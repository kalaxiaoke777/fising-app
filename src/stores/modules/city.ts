import { defineStore } from "pinia";
import { ref } from "vue";

export const useCityStore = defineStore('city', {
    state: () => ({
        cityName: undefined as string | undefined,
    }),
    actions: {
        setCityName(name: string) {
            this.cityName = name;
        },
        clearCityName() {
            this.cityName = undefined;
        },
    },
    persist: {
        storage: {
            getItem(key: string) {
                return localStorage.getItem(key);
            },
            setItem(key: string, value: string) {
                uni.setStorageSync(key, value);
            },
        },
    },
});
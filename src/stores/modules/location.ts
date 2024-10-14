import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', {
    state: () => ({
        longitude: undefined as number | undefined,
        latitude: undefined as number | undefined,
    }),
    actions: {
        setLocationName(longitude: number,latitude: number) {
            this.longitude = longitude;
            this.latitude = latitude;
        },
        clearLocationName() {
            this.longitude = undefined;
            this.latitude = undefined;
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
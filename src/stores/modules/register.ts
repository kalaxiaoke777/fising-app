import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
    state: () => ({
        openid: undefined as string | undefined,
    }),
    actions: {
        setCityName(openid: string) {
            this.openid = openid;
        },
        clearCityName() {
            this.openid = undefined;
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
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: undefined as string | undefined,

    }),
    actions: {
        setCityName(token: string) {
            this.token = token;
        },
        clearCityName() {
            this.token = undefined;
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
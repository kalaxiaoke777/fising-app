import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', {
    state: () => ({
        token: undefined as string | undefined,

    }),
    actions: {
        setUserName(token: string) {
            this.token = token;
        },
        clearUserName() {
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
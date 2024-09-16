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
                try {
                    return uni.getStorageSync(key);
                } catch (e) {
                    console.error('getStorageSync error:', e);
                    return null;
                }
            },
            setItem(key: string, value: string) {
                try {
                    uni.setStorageSync(key, value);
                } catch (e) {
                    console.error('setStorageSync error:', e);
                }
            },
        },
    },
});
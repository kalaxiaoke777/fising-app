import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', {
    state: () => ({
        access_token: undefined as string | undefined,
        openid: undefined as string | undefined,
        UniCloud: undefined as string | undefined,
    }),
    actions: {
        setCityName(access_token: string,openid: string,UniCloud: string) {
            this.access_token = access_token;
            this.openid = openid;
            this.UniCloud = UniCloud;
        },
        clearCityName() {
            this.access_token = undefined;
            this.openid = undefined;
            this.UniCloud = undefined;
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
import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
    state: () => ({
        openid: undefined as string | undefined,
        username: undefined as string | undefined,
        phonenumber: undefined as string | undefined,
    }),
    actions: {
        setCityName(openid: string,username: string,phonenumber: string) {
            this.openid = openid;
            this.username = username;
            this.phonenumber = phonenumber;
        },
        clearCityName() {
            this.openid = undefined;
            this.username = undefined;
            this.username = undefined;
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
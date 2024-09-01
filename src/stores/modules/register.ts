import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
    state: () => ({
        session_key: undefined as string | undefined,
        openid: undefined as string | undefined,
    }),
    actions: {
        setCityName(session_key: string, openid: string) {
            this.session_key = session_key;
            this.openid = openid;
        },
        clearCityName() {
            this.session_key = undefined;
            this.openid = undefined;
        },
    },
});
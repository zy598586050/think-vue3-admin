import { defineStore } from "pinia";
import config from "@/config";

const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: "",
      userInfo: {},
    };
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    clearToken() {
      this.token = "";
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    clearUserInfo() {
      this.userInfo = {};
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: config.namespace,
        storage: localStorage,
        paths: ["token", "userInfo"],
      },
    ],
  },
});

export default useUserStore;

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@/config";
import router from "@/router";
import { useUserStore } from "@/store";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStorage } from "@vueuse/core";
import { clerRoutes } from "@/utils/asyncRoutes";

interface OptionsType {
  url: string;
  method?: string;
  params?: any;
  data?: any;
  mock?: boolean;
}

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 8000,
});

// 请求拦截
service.interceptors.request.use(
  (request) => {
    const headers = request?.headers;
    const locData = useStorage(config.namespace, {
      token: "",
    });
    const token = locData.value.token;
    if (!headers.Authorization) {
      headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error?.response?.data) {
      if (
        error?.response?.data?.errorCode === 30001 &&
        window.location.href.split("#")[1] !== "/login"
      ) {
        const userStore = useUserStore();
        ElMessageBox.alert("Token已过期，请重新登录。", "提示", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          showClose: false,
          type: "warning",
        }).then(() => {
          // 重新登录
          userStore.clearToken();
          userStore.clearUserInfo();
          clerRoutes(userStore, router);
          router.push({ path: "/login" });
        });
      } else {
        ElMessage.error(error?.response?.data?.msg);
      }
    }
    return Promise.reject(error);
  }
);

const request: any = (options: OptionsType) => {
  options.method = options?.method?.toLowerCase() || "get";
  // get应该用params传参，防止post写习惯了突然改get, data参数自动转params
  if (!options.params && options.method === "get") {
    options.params = options.data;
  }
  const isMock = options.mock || config.mock;
  if (config.env === "production") {
    service.defaults.baseURL = config.baseUrl;
  } else {
    service.defaults.baseURL = isMock ? config.mockUrl : config.baseUrl;
  }
  return service(options);
};

["get", "post", "put", "delete", "patch"].forEach((item: string) => {
  request[item] = (url: string, options: OptionsType) => {
    return request({
      method: item,
      ...options,
      url,
    });
  };
});

export default request;

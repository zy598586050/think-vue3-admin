import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "element-plus/dist/index.css";
import "virtual:windi.css";
import ElementPlus from "element-plus";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useUserStore } from "@/store";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia);
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 自定义按钮权限校验
app.directive("has", {
  beforeMount: (el, binding) => {
    // 获取按钮权限
    const userStore: any = useUserStore();
    const btnList = userStore.userInfo.auth_array;
    const value = binding.value;
    const hasPermission = btnList.includes(value);
    if (!hasPermission) {
      setTimeout(() => {
        el.parentNode.removeChild(el);
      }, 0);
    }
  },
});

app.mount("#app");

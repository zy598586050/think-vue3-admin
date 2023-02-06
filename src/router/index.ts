import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store";
import { addRoutes } from "@/utils/asyncRoutes";

import Home from "@/views/home/index.vue";
import NotFound from "@/views/home/404.vue";
import Login from "@/views/login/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    meta: {
      title: "首页",
      layout: true,
    },
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      layout: false,
    },
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

let registerRouteFresh = true;
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  document.title = to.meta.title as string;
  if (!userStore.token && to.path !== "/login") {
    return next({ path: "/login" });
  }
  if (userStore.token && to.path === "/login") {
    return next({ path: from.path === "/404" ? "/" : from.path });
  }
  if (userStore.token && !from.name && registerRouteFresh) {
    addRoutes(userStore.userInfo, router);
    next({ ...to, replace: true });
    registerRouteFresh = false;
  }
  next();
});

export default router;

<template>
  <div>
    <el-container class="min-h-screen">
      <el-aside
        :width="isCollapse ? '64px' : '200px'"
        class="bg-cool-[#304156]"
      >
        <div
          v-if="isCollapse == false"
          class="flex justify-center items-center font-bold text-cool-[#fff] h-15 text-[18px]"
        >
          <span>ThinkVue3Admin</span>
        </div>
        <el-menu
          :default-active="$route.path"
          background-color="#304156"
          text-color="#fff"
          router
          :collapse="isCollapse"
          class="border-r-0"
        >
          <tree-menu :menu-list="menuList" />
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="bg-cool-[#304156] flex justify-between items-center">
          <div class="flex items-center">
            <el-icon class="cursor-pointer" color="#fff" @click="toggle">
              <expand v-if="isCollapse" />
              <fold v-else />
            </el-icon>
            <BreadCrumb />
          </div>
          <el-dropdown class="flex items-center" @command="handleLogout">
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full"
                :src="userStore.userInfo.avatar"
              />
              <span class="text-cool-[#fff] ml-2">{{
                userStore.userInfo.name
              }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="reset">修改密码</el-dropdown-item>
                <el-dropdown-item divided command="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/store";
import TreeMenu from "@/layout/components/TreeMenu/index.vue";
import BreadCrumb from "@/layout/components/BreadCrumb/index.vue";
import { ElMessageBox } from "element-plus";
import { clerRoutes } from "@/utils/asyncRoutes";
import { useRouter } from "vue-router";

const isCollapse = ref(false);
const menuList = ref([]);
const userStore: any = useUserStore();
const router = useRouter();
menuList.value = userStore?.userInfo?.menu_tree;
const toggle = () => {
  isCollapse.value = !isCollapse.value;
};
const handleLogout = (key: string) => {
  if (key === "logout") {
    ElMessageBox.confirm("您确定要退出登录？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        userStore.clearToken();
        userStore.clearUserInfo();
        clerRoutes(userStore, router);
        router.push({ path: "/login" });
      })
      .catch(() => {
        console.log("取消了操作");
      });
  } else {
    ElMessageBox.prompt("请输入新密码", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      // eslint-disable-next-line no-useless-escape
      inputPattern: /^[\w_\.\-]{1,18}$/,
      inputType: "password",
      inputErrorMessage: "密码格式不正确",
    })
      .then((value) => {})
      .catch(() => {
        console.log("取消了操作");
      });
  }
};
</script>

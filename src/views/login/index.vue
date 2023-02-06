<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎使用</div>
        <div>此管理系统是基于Vue3+TS+Windicss+Pinia+Vite开发</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">ThinkVue3Admin</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :model="form" :rules="rules" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="w-[250px]"
            round
            color="#626aef"
            type="primary"
            :loading="loading"
            @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { login } from "./service";
import { useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { addRoutes } from "@/utils/asyncRoutes";

const userStore = useUserStore();
const router = useRouter();

const form = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
};

const formRef = ref<any>(null);
const loading = ref<boolean>(false);

const onSubmit = () => {
  formRef.value.validate((result: any) => {
    if (result) {
      loading.value = true;
      login(form)
        .then((res: any) => {
          if (res.code === 200) {
            userStore.setToken(res?.data?.token);
            userStore.setUserInfo({
              name: res?.data?.name,
              avatar: res?.data?.avatar,
              menu_tree: res?.data?.menu_tree,
              auth_array: res?.data?.auth_array,
            });
            addRoutes(userStore.userInfo, router);
            router.push({ path: "/" });
          }
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
};

onMounted(() => {
  window.addEventListener("keydown", keyDown);
});

const keyDown = (e: any) => {
  //如果是回车则执行登录方法
  if (e.keyCode === 13) {
    onSubmit();
  }
};

onUnmounted(() => {
  window.removeEventListener("keydown", keyDown, false);
});
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}
.login-container .right {
  @apply bg-light-50 flex-col;
}
.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-lg;
}
.right .title {
  @apply font-bold text-4xl text-gray-800;
}
.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>

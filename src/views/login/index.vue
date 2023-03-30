<template>
    <el-row class="min-h-screen bg-indigo-500">
        <el-col :lg="16" :md="12" class="flex items-center justify-center">
            <div>
                <div class="font-bold text-5xl text-light-50 mb-4">欢迎使用</div>
                <div class="text-gray-200 text-lg">此管理系统是基于 gfast-ui 项目改造的 Vue3+TS+Windicss+Pinia+Vite 项目。</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="flex items-center justify-center bg-light-50 flex-col">
            <div class="login-content-main">
                <div v-if="!isScan">
                    <el-tabs v-model="tabsActiveName">
                        <el-tab-pane :label="$t('message.label.one1')" name="account">
                            <Account />
                        </el-tab-pane>
                        <el-tab-pane :label="$t('message.label.two2')" name="mobile">
                            <Mobile />
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <Scan v-if="isScan" />
                <div class="login-content-main-sacn" @click="isScan = !isScan">
                    <i class="iconfont" :class="isScan ? 'icon-diannao1' : 'icon-barcode-qr'"></i>
                    <div class="login-content-main-sacn-delta"></div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { toRefs, reactive, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '@/store/themeConfig';
import { NextLoading } from '@/utils/loading';
import Account from '@/views/login/component/account.vue';
import Mobile from '@/views/login/component/mobile.vue';
import Scan from '@/views/login/component/scan.vue';

// 定义接口来定义对象的类型
interface LoginState {
    tabsActiveName: string;
    isScan: boolean;
}

const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const state = reactive<LoginState>({
    tabsActiveName: 'account',
    isScan: false,
});
// 获取布局配置信息
const getThemeConfig = computed(() => {
    return themeConfig.value;
});
// 页面加载时
onMounted(() => {
    NextLoading.done();
});
const { isScan, tabsActiveName } = toRefs(state)
</script>

<style scoped lang="scss">
.login-content-main {
    position: relative;
    margin: 0 auto;
    width: 60%;

    .login-content-title {
        color: var(--el-text-color-primary);
        font-weight: 500;
        font-size: 22px;
        text-align: center;
        letter-spacing: 4px;
        margin: 15px 0 30px;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        transition: all 0.3s ease;
    }
}

.login-content-main-sacn {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    overflow: hidden;
    cursor: pointer;
    transition: all ease 0.3s;
    color: var(--el-text-color-primary);

    &-delta {
        position: absolute;
        width: 35px;
        height: 70px;
        z-index: 2;
        top: 2px;
        right: 21px;
        background: var(--el-color-white);
        transform: rotate(-45deg);
    }

    &:hover {
        opacity: 1;
        transition: all ease 0.3s;
        color: var(--el-color-primary) !important;
    }

    i {
        width: 47px;
        height: 50px;
        display: inline-block;
        font-size: 48px;
        position: absolute;
        right: 2px;
        top: -1px;
    }
}
</style>
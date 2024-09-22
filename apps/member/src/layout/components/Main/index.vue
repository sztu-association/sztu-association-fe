<template>
  <el-main class="mt-9 !p-0 bg-[var(--el-bg-color-page)]">
    <el-scrollbar>
      <div class="p-3 h-full">
        <router-view>
          <template #default="{ Component, route }">
            <transition :name="themeStore.animateMode" mode="out-in" appear>
              <keep-alive :include="routeStore.cacheList">
                <component :is="Component" :key="route.fullPath" v-if="appStore.reloadFlag" />
              </keep-alive>
            </transition>
          </template>
        </router-view>
      </div>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { useAppStore, useRouteStore, useThemeStore } from '@/store';

defineOptions({ name: 'MainPage' });
const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
</script>

<style lang="scss" scoped></style>

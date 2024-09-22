<template>
  <el-container class="h-full">
    <el-aside :class="['h-full']" :width="collapseWidth">
      <Asider />
    </el-aside>
    <el-container direction="vertical" class="relative">
      <NavTab />
      <Main />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Asider from './components/Asider/index.vue';
import NavTab from './components/NavTab/index.vue';
import Main from './components/Main/index.vue';
import { useAppStore } from '@/store';

defineOptions({ name: 'Layout' });

const appStore = useAppStore();
const collapseWidth = computed(() => {
  return appStore.isCollapse ? '65px' : '180px';
});
</script>

<style lang="scss" scoped></style>

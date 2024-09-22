<template>
  <el-aside :class="['sider', 'fixed', 'h-full']" :width="collapseWidth">
    <Menu />
  </el-aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Menu from './Menu.vue';
import { useAppStore } from '@/store';

defineOptions({ name: 'Asider' });

const appStore = useAppStore();
const collapseWidth = computed(() => {
  return appStore.isCollapse ? '65px' : '180px';
});
</script>

<style lang="scss" scoped>
.sider {
  @apply flex-col-stretch bg-background  shadow-[0_0_1px_#888] z-99 transition-width duration-300;
}
</style>

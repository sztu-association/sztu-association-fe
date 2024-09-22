import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  // 状态
  const isCollapse = ref(false);
  const reloadFlag = ref(true);

  // Actions
  const setIsCollapse = (collapse: boolean) => {
    isCollapse.value = collapse;
  };

  const setReloadFlag = () => {
    reloadFlag.value = false;
    nextTick(() => {
      reloadFlag.value = true;
    });
  };

  return {
    isCollapse,
    reloadFlag,
    setIsCollapse,
    setReloadFlag
  };
});

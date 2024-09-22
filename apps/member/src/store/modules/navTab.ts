import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';
import { storage } from '@/utils/storage';

export const useNavTabStore = defineStore('navTab', () => {
  // 状态
  const tabsList = ref<App.TabsView[]>([]);

  // Actions
  const reset = () => {
    storage.remove('navTab');
    tabsList.value = [];
  };

  /** 添加多页签 */
  const add = (tab: App.TabsView) => {
    if (tabsList.value.some((v: App.TabsView) => v.fullPath === tab.fullPath)) return;
    if (tab.title) tabsList.value.push(tab);
    storage.set('navTab', tabsList.value);
  };

  /** 删除多页签 */
  const closeCurrent = (fullPath: string) => {
    const isActive = router.currentRoute.value.fullPath === fullPath;
    const newTabsList = tabsList.value.filter((v) => v.fullPath !== fullPath);
    if (newTabsList.length && isActive) {
      router.push(newTabsList[newTabsList.length - 1].fullPath);
    }
    tabsList.value = newTabsList;
    storage.set('navTab', tabsList.value);
  };

  /** 关闭左侧多页签 */
  const closeLeft = (fullPath: string) => {
    const index = tabsList.value.findIndex((v) => v.fullPath === fullPath);
    if (index >= 0) {
      const filterTabs = tabsList.value.slice(0, index).filter((v) => v.affix);
      tabsList.value = [...filterTabs, ...tabsList.value.slice(index)];
      if (tabsList.value.length) router.push(tabsList.value[tabsList.value.length - 1].fullPath);
      storage.set('navTab', tabsList.value);
    }
  };

  /** 关闭右侧多页签 */
  const closeRight = (fullPath: string) => {
    const index = tabsList.value.findIndex((v) => v.fullPath === fullPath);
    if (index >= 0) {
      const filterTabs = tabsList.value.slice(index + 1).filter((v) => v.affix);
      tabsList.value = [...tabsList.value.slice(0, index + 1), ...filterTabs];
      if (tabsList.value.length) router.push(tabsList.value[tabsList.value.length - 1].fullPath);
      storage.set('navTab', tabsList.value);
    }
  };

  /** 关闭其他多页签 */
  const closeOther = (fullPath: string) => {
    const newTabsList = tabsList.value.filter((v) => v.affix || v.fullPath === fullPath);
    if (newTabsList.length) router.push(newTabsList[newTabsList.length - 1].fullPath);
    tabsList.value = newTabsList;
    storage.set('navTab', tabsList.value);
  };

  /** 清空多页签 */
  const closeAll = () => {
    const newTabsList = tabsList.value.filter((v) => v.affix);
    if (newTabsList.length) router.push(newTabsList[newTabsList.length - 1].fullPath);
    tabsList.value = newTabsList;
    storage.set('navTab', tabsList.value);
  };

  return {
    tabsList,
    reset,
    add,
    closeCurrent,
    closeLeft,
    closeRight,
    closeOther,
    closeAll
  };
});

import { defineStore } from 'pinia';
import { ref } from 'vue';
import { storage } from '@/utils/storage';
import { initThemeSetting } from '@/config';
import { getThemeColor } from '@/utils/theme';

export const useThemeStore = defineStore('theme', () => {
  // 初始化状态
  const state = ref(initThemeSetting());

  // Actions
  const setIsDark = (dark: boolean) => {
    state.value.isDark = dark;
    if (dark) {
      state.value.menuMode = 'light';
      document.documentElement.className = 'layout-menu-light dark';
    } else {
      document.documentElement.classList.remove('dark');
    }
    storage.set('themeSetting', state.value);
  };

  const setGrayMode = (grayMode: boolean) => {
    state.value.grayMode = grayMode;
    document.documentElement.classList.toggle('html-grey');
    storage.set('themeSetting', state.value);
  };

  const setMenuMode = (menuMode: string) => {
    state.value.menuMode = menuMode;
    const dark = state.value.isDark ? 'dark' : '';
    document.documentElement.className = `layout-menu-${menuMode} ${dark}`;
    storage.set('themeSetting', state.value);
  };

  const setBreadCrumb = (breadCrumb: boolean) => {
    state.value.breadCrumb = breadCrumb;
    storage.set('themeSetting', state.value);
  };

  const setMenuUnique = (menuUnique: boolean) => {
    state.value.menuUnique = menuUnique;
    storage.set('themeSetting', state.value);
  };

  const setNavTab = (navTab: boolean) => {
    state.value.navTab = navTab;
    storage.set('themeSetting', state.value);
  };

  const setNavTabIcon = (navTabIcon: boolean) => {
    state.value.navTabIcon = navTabIcon;
    storage.set('themeSetting', state.value);
  };

  const setThemeColor = (color: string) => {
    if (!color) return;
    const colors = {
      '--el-color-primary': color,
      '--el-color-primary-dark-2': getThemeColor(state.value.isDark, color, 0.3),
      ...Array.from({ length: 9 }, (_: unknown, i: number) => ({
        [`--el-color-primary-light-${i + 1}`]: getThemeColor(
          state.value.isDark,
          color,
          (i + 1) / 10
        )
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
    };
    const theme =
      (state.value.isDark ? 'html.dark' : ':root') +
      JSON.stringify(colors).replace(/,/g, ';').replace(/"/g, '');
    let style = document.getElementById('theme-var');
    if (style) {
      style.innerHTML = theme;
    } else {
      style = document.createElement('style');
      style.textContent = theme;
      style.id = 'theme-var';
      document.head.append(style);
    }
    state.value.themeColor = color;
    storage.set('themeSetting', state.value);
  };

  const setAnimateMode = (animateMode: string) => {
    state.value.animateMode = animateMode;
    storage.set('themeSetting', state.value);
  };

  return {
    state,
    setIsDark,
    setGrayMode,
    setMenuMode,
    setBreadCrumb,
    setMenuUnique,
    setNavTab,
    setNavTabIcon,
    setThemeColor,
    setAnimateMode
  };
});

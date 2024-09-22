import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { useAppStore } from '@/store';
import { unref } from 'vue';

const appStore = useAppStore();

export function isMobile() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const status = unref(breakpoints.smaller('sm'));
  appStore.setIsCollapse(status);
  return status;
}

isMobile();

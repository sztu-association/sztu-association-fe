<template>
  <wd-config-provider :themeVars="themeVars">
    <wd-toast />
    <wd-message-box />
    <slot />
    <sztu-tabbar />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}
</script>

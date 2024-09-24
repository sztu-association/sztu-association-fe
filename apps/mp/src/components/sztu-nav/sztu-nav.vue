<template>
  <wd-navbar fixed placeholder :title="title" left-arrow safeAreaInsetTop>
    <template #capsule>
      <wd-navbar-capsule @back="handleBack" @back-home="handleBackHome" />
    </template>
  </wd-navbar>
</template>

<script setup lang="ts">
interface Props {
  title: string
}
const props = defineProps<Props>()
const { title } = toRefs(props)
const handleBackHome = () => {
  uni.reLaunch({ url: '/pages/index/index' })
}

const handleBack = () => {
  if (getCurrentPages().length > 1) {
    uni.navigateBack({})
  } else {
    handleBackHome()
  }
}
</script>

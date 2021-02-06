<template>
  <div :class="[$style.page, $style.color__bg_primary]">
    <TheHeader />
    <Nuxt />
    <TheModal />
  </div>
</template>

<script>
export default {
  components: {
    TheHeader: () => import('@/components/unique/layout/TheHeader'),
    TheModal: () => import('@/components/unique/layout/TheModal')
  }
}
</script>
<style lang="scss" module>

.page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-bottom: 48px;
}

@include brp(xm) {
  .page {
    padding-bottom: calc(48px + 80px);
  }
}
</style>

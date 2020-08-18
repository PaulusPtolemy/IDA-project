<template>
  <div :class="[$style.page, $style.color__bg_primary]">
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
export default {
  components: {
    TheHeader: () => import('~/components/TheHeader')
  }
}
</script>
<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";

.page {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-bottom: 54px;
}
</style>

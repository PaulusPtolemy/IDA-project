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
@import "~/assets/scss/mixins.scss";

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

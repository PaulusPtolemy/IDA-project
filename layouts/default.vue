<template>
  <div :class="[$style.page, $style.color__bg_primary]">
    <TheHeader />
    <Nuxt :class="[$style.color__bg_secondary, $style.cont]" />
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
  padding-bottom: 54px;
}

.cont {
  @include content-wrap;
  border-radius: $border-r-large;
  height: auto;
}
</style>

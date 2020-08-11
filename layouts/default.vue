<template>
  <div :class="[$style.page, $style.color__bg_primary]">
    <TheHeader />
    <div v-if="$store.getters.getErrorOnLoad">
      {{ $store.getters.getErrorOnLoad }}
    </div>
    <Nuxt v-else />
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
}
</style>

<template>
  <div class="container">
    <div>
      <div :class="[$style.color__title, $style.color__bg_primary]">
        {{ getdata }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch ({ store }) {
    await store.dispatch('GET_DATA_ACT')
  },
  computed: {
    ...mapGetters(['getdata'])
  }
}
</script>

<style lang="scss" module>
@import '~/assets/scss/_main.scss';
</style>

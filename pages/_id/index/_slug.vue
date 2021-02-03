<template>
  <div :class="$style.tab">
    <div
      :class="[$style.color__descr, $style.tab_descr]"
    >
      {{ lotTab.data }}
    </div>
    <specifications v-if="slugName === 'specifications'" />
    <team v-if="slugName === 'team'" />
    <term-rent v-if="slugName === 'term'" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {
    specifications: () => import('~/components/hardcode/specifications'),
    team: () => import('~/components/hardcode/team'),
    termRent: () => import('~/components/hardcode/termRent.vue')
  },

  async fetch ({ store, route, error }) {
    try {
      const data = await store.dispatch('ACT_CURRENT_LOT_TAB', { route })
      if (!data) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    } catch (err) {
      error({ statusCode: 418, message: 'An error has occurred' })
    }
  },

  computed: {
    ...mapState({
      lotTab: state => state.currentLotTab
    }),

    slugName () {
      return this.lotTab.label.replace('_text', '').toLowerCase()
    }
  },

  watch: {
    Mode () {
      if (this.isIE()) {
        const svgs = ['cup_icon', 'man_icon']
        for (let i = 0; i < svgs.length; i++) {
          this.changeSVGColor(
            svgs[i],
            'fill',
            this.$options.$RGBcolors.$base200,
            this.$options.$RGBcolors.$base300
          )
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
  @import "assets/scss/modules_import.scss";
  @import "assets/scss/mixins.scss";

  .tab {
    &_descr {
      font-size: $fontSizeSmaller;
      line-height: $line-h-large;
      font-weight: $fontWeightMedium;
      margin-bottom: 32px;
    }
  }

  @include brp(xm) {
    .tab {
      &_descr {
        margin-bottom: 20px;
      }
    }
  }
</style>

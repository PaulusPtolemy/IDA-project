<template>
  <div :class="$style.container">
    <img :src="lot.image" :class="$style.image" alt="Lot image">
    <div :class="$style.content">
      <h1 :class="[$style.color__title ,$style.title]">
        {{ lot.name }}
      </h1>
      <div :class="$style.tabs">
        <nuxt-link
          v-for="tab in getTabs"
          :key="tab.slug"
          :to="`/${lot.id}/${tab.label}`"
          :class="[
            $style.color__descr,
            $style.tabs_label,
            $style.label,
            { [$style.tab_chosen]: chosenTab === tab.label },
          ]"
          @click="chosenTab = tab.label"
        >
          {{ tab.label | capitalize }}
        </nuxt-link>
      </div>
      <div
        v-if="currentTab"
        :class="[$style.color__descr, $style.tab_descr]"
      >
        {{ currentTab.descr }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  async fetch ({ store, route, error }) {
    try {
      const data = await store.dispatch('ACT_CURRENT_LOT', { route })
      if (!data) {
        error({ statusCode: 404, message: 'Page not found' })
      }
    } catch (err) {
      error({ statusCode: 418, message: 'An error has occurred' })
    }
  },
  data () {
    return {
      chosenTab: null
    }
  },
  computed: {
    ...mapGetters({
      lot: 'getCurrentProduct'
    }),
    getTabs () {
      const tabs = []
      for (const key in this.lot) {
        if (key.includes('_text')) {
          const delText = key.replace('_text', '')
          tabs.push({
            label: delText,
            slug: key,
            descr: this.lot[key]
          })
        }
      }
      return tabs
    },
    currentTab () {
      return this.getTabs.find(e => e.label === this.chosenTab)
    }
  },
  mounted () {
    this.chosenTab = this.getTabs[0].label
  }
}
</script>

<style lang="scss" module>
  @import "~/assets/scss/modules_import.scss";
  @import "~/assets/scss/mixins.scss";

  .container {
    @include content-wrap;
    display: flex;

  }
  .image {
    width: 712px;
    height: 700px;
    object-fit: cover;
    border-radius: $border-r-medium;
    margin-right: 64px;
  }
  .title {
    font-size: $fontSizeLarge;
    line-height: $line-h-mega;
    margin-bottom: 32px;
  }
  .tabs {
    display: flex;
    margin-bottom: 32px;

    &_label {
      font-weight: $fontWeightBold;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 32px;
      }
    }
  }
  .tab {
    &_descr {
      font-size: $fontSizeSmaller;
      line-height: $line-h-large;
      font-weight: $fontWeightMedium;
    }
    &_chosen {
      color: $main-400!important;
    }
  }

</style>

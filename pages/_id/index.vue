<template>
  <div :class="$style.container">
    <div :class="[$style.image_wrap, $style.color__bg_secondary]">
      <img
        :src="lot.image"
        :class="$style.image"
        alt="Lot image"
      >
    </div>
    <div :class="$style.content">
      <h1 :class="[$style.color__title, $style.title]">
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
          ]"
        >
          {{ tab.label | capitalize }}
        </nuxt-link>
      </div>
      <NuxtChild />
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
  middleware ({ route, redirect }) {
    if (route.params.id && !route.params.slug) {
      return redirect(`/${route.params.id}/specifications`)
    }
  },
  computed: {
    ...mapGetters({
      lot: 'getCurrentLot'
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
    }
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
  .content {
    width: 100%;
  }
  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: $border-r-medium;

    &_wrap {
      width: 712px;
      height: 700px;
      margin-right: 64px;
      border-radius: $border-r-medium;
      flex-shrink: 0;
    }
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

</style>

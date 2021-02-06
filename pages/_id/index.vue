<template>
  <div :class="$style.container">
    <div :class="[$style.image_wrap, $style.color__bg_secondary]">
      <ImageLazy
        :class="$style.image"
        :image="lot.image"
        class="ListItem"
      />
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
      <div :class="$style.rent_block">
        <div :class="[$style.rent_shadow, $style.color__shadow]" />
        <div :class="[$style.rent_wrap, $style.color__bg_secondary]">
          <div :class="[$style.color__title, $style.rent_text]">
            <p>
              Rent for
            </p>
            <span :class="$style.color__price">
              {{ lot.rent }} $/h
            </span>
          </div>
          <btn :class="$style.rent_btn">
            Rent now
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import btn from '@/components/common/ui/VButton.vue'
import ImageLazy from '@/components/common/VImageLazy'

export default {
  components: {
    btn,
    ImageLazy
  },

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
    ...mapState({
      lot: state => state.currentLot
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
      position: relative;
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

  .rent {
    &_block {
      width: 100%;
      margin-top: 45px;
    }

    &_wrap {
      display: flex;
      align-items: center;
      padding: 0 32px;
      height: 80px;
      border-radius: $border-r-small;
    }

    &_btn {
      margin-left: auto;
    }

    &_text {
      font-size: $fontSizeBigger;
      font-weight: $fontWeightBold;
      display: flex;
      flex-wrap: wrap;
      padding-right: 10px;

      p {
        margin-right: 4px;
      }
    }
  }

  @include brp(xl) {
    .container {
      padding: 0 16px;
    }
  }

  @include brp(lg) {
    .image_wrap {
      margin-right: 32px;
      width: 600px;
      height: 600px;
    }
  }

  @include brp(ml) {
    .image_wrap {
      width: 500px;
      height: 500px;
    }
  }

  @include brp(md) {
    .container {
      flex-direction: column;
    }

    .image_wrap {
      margin-bottom: 32px;
      width: 100%;
      height: 600px;
    }

    .rent_block {
      width: 100%;
    }
  }

  @include brp(xm) {
    .image_wrap {
      height: 332px;
      margin-bottom: 22px;
    }

    .title {
      font-size: $fontSizeBigOne;
      margin-bottom: 16px;
    }

    .tabs {
      margin-bottom: 20px;
    }

    .rent {
      &_block {
        position: fixed;
        width: calc(100% - 32px);
        bottom: 32px;
        left: 16px;
      }

      &_shadow {
        display: block;
        position: absolute;
        top: -26px;
        left: -16px;
        height: 34px;
        width: calc(100% + 32px);
        z-index: $z-index-shadow;
      }

      &_wrap {
        position: relative;
        z-index: $z-index-content;
      }

      &_text {
        font-size: $fontSizeBase;
      }

      &_btn {
        padding: 16px 24px;
      }
    }
  }

</style>

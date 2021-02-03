<template>
  <div
    :style="[preview ? {backgroundImage: `url(${preview})`} : '']"
    :class="['image-lazy', classes]"
  >
    <template v-if="tag === 'img'">
      <img
        v-if="image"
        v-lazy="image"
        class="image-lazy__image"
      >
    </template>
    <template v-else>
      <div
        v-if="isSwiperSlider"
        :data-background="image"
        class="image-lazy__image swiper-lazy"
      />
      <div
        v-else
        v-lazy:background-image="image"
        class="image-lazy__image"
      />
    </template>
  </div>
</template>

<script>

export default {
  name: 'ImageLazy',

  props: {
    preview: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },

    relative: {
      type: Boolean,
      default: false
    },
    absolute: {
      type: Boolean,
      default: false
    },
    contain: {
      type: Boolean,
      default: false
    },

    tag: {
      type: String,
      default: 'div',
      validator (val) {
        return ['div', 'img'].includes(val)
      }
    },

    isSwiperSlider: Boolean
  },

  computed: {
    classes () {
      return {
        'is-relative': this.relative,
        'is-absolute': this.absolute,
        'is-contain': this.contain
      }
    }
  }
}
</script>

<style lang="scss">
@import "assets/scss/modules_import.scss";
@import "assets/scss/mixins.scss";

.image-lazy {
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: rgba($base-0, 0.3);
    transform: translate3d(0, 0, 0);
    will-change: transform;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;

    &[lazy="loaded"] {
      opacity: 1;
    }
  }

  &.ListItem {
    .image-lazy__image {
      border-radius: 24px;
    }
  }

  &.is-relative {
    position: relative;
  }

  &.is-absolute {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  &.is-contain {
    background-size: contain;

    .image-lazy__image {
      background-size: contain;
    }
  }
}
</style>

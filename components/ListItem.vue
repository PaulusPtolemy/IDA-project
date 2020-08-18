<template>
  <transition name="fade" appear>
    <div :class="[$style.color__bg_primary ,$style.item]">
      <div :class="[$style.img_wrap, $style.color__bg_secondary]">
        <img
          :src="itemData.preview"
          :class="$style.img"
          alt="Item Photo"
          @error="$event.target.src='~/assets/img/pepe.png'"
        >
      </div>
      <div :class="$style.right">
        <p :class="[$style.color__title, $style.title ]">
          {{ itemData.name }}
        </p>
        <p :class="[$style.color__descr, $style.descr]">
          {{ itemData.description }}
        </p>
        <p :class="[$style.color__price, $style.price]">
          {{ itemData.rent }} $/h
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    itemData: {
      type: Object,
      default () {
        return {
          preview: '~/assets/img/logo.png',
          name: 'Test User',
          description: 'Test description',
          rent: '100'
        }
      }
    }
  }
}
</script>

<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";
.item {
  padding: 24px 32px 24px;
  display: flex;
  border-radius: $border-r-huge;
}
.img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: $border-r-medium;
  position: relative;
  z-index: 2;

  &_wrap {
    position: relative;
    width: 88px;
    height: 88px;
    margin-right: 24px;
    flex-shrink: 0;
    border-radius: $border-r-medium;
    z-index: 0;
  }
}
.right {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.title {
  font-weight: $fontWeightBold;
  margin-bottom: 12px;
}
.descr {
  font-size: $fontSizeSmall;
  margin-bottom: 16px;
}
.price {
  font-weight: $fontWeightBold;
  font-size: $fontSizeSmaller;
}
</style>

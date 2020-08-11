<template>
  <div :class="$style.header">
    <nuxt-link to="/" :class="$style.logo">
      <LogoIcon :class="[$style.logo_icon, $style.color_logo]" />
      <span :class="[$style.logo_title, $style.color__title]">Pepelane</span>
    </nuxt-link>
    <div :class="$style.color__descr">
      World's first affordable airsharing
    </div>
    <div :class="$style.right_float">
      <ColorModePicker />
      <MessageIcon :class="$style.message" />
      <NotIcon :class="$style.notification" />
      <div :class="[$style.user_name, $style.color__title]">
        {{ getUser.name }}
      </div>
      <!-- img from base64 -->
      <img :class="$style.user_avatar" :src="'data:image/jpeg;base64,' + getUser.avatar">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ColorModePicker from '@/components/ColorModePicker'

import LogoIcon from '~/assets/svg/Logo.svg?inline'
import MessageIcon from '~/assets/svg/message.svg?inline'
import NotIcon from '~/assets/svg/notification.svg?inline'

export default {
  name: 'TheHeader',
  components: {
    LogoIcon,
    MessageIcon,
    NotIcon,
    ColorModePicker
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";
@import "~/assets/scss/mixins.scss";
.slogan {
  font-size: $fontSizeBase;
}
.header {
  @include content-wrap;
  display: flex;
  align-items: center;
  padding: 48px 0 40px 0;
  background-color: transparent;
}
.logo {
  margin-right: 65px;
  display: flex;
  align-items: center;

  &_title {
    font-size: $fontSizeBig;
    margin-left: 18px;
    font-weight: $fontWeightBold;
  }
}
.right_float {
  margin-left: auto;
  display: flex;
  align-items: center;
}
.message {
  margin-left: 108px;
}
.notification {
  margin-left: 30px;
  position: relative;

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: red;
  }
}
.user {
  &_name {
    margin-left: 52px;
    color: $base-500;
    font-size: $fontSizeBase;
    font-weight: $fontWeightBold;
    line-height: $line-h-grand;
  }
  &_avatar {
    margin-left: 16px;
    border-radius: 50%;
  }
}
</style>

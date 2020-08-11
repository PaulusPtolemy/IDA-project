<template>
  <div>
    <div
      v-if="mode ==='dark'"
      :class="$style.picker"
      @click="[$colorMode.preference = 'light', mode = 'light']"
    >
      <IconLight />
      <span :class="$style.color__descr">Day mod</span>
    </div>
    <div
      v-if="mode ==='light'"
      :class="$style.picker"
      @click="[$colorMode.preference = 'dark', mode = 'dark']"
    >
      <IconDark />
      <span :class="$style.color__descr">Night mod</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ColorModePicker',
  components: {
    IconDark: () => import('~/assets/svg/dark.svg?inline'),
    IconLight: () => import('~/assets/svg/light.svg?inline')
  },
  data () {
    return {
      mode: null
    }
  },
  mounted () {
    this.$colorMode.preference ? this.mode = this.$colorMode.preference : this.mode = 'light'
  }
}
</script>

<style lang="scss" module>
@import "~/assets/scss/modules_import.scss";
.picker {
  display: flex;
  align-items: center;
  width: 110px;
  cursor: pointer;

  &:hover {
    span {
      transition: color ease-in-out 300ms;
      color: $main-400;
    }

    svg {
      path {
        fill: $main-400;
      }
    }
  }

  span {
    transition: color ease-in-out 300ms;
    margin-left: auto;
  }
}
</style>

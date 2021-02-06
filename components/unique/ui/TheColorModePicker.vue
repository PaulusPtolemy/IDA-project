<template>
  <div
    v-if="isIE()"
    @mouseenter="hoverSVG(currentIdIcon, 'enter')"
    @mouseleave="hoverSVG(currentIdIcon, 'leave')"
  >
    <div
      v-if="Mode === 'dark'"
      :class="$style.picker"
      @click="changeMode('light')"
    >
      <IconLight id="light-icon" />
      <span :class="$style.color__descr">
        Day mod
      </span>
    </div>
    <div
      v-if="Mode === 'light'"
      :class="$style.picker"
      @click="changeMode('dark')"
    >
      <IconDark id="dark-icon" />
      <span :class="$style.color__descr">
        Night mod
      </span>
    </div>
  </div>
  <div v-else>
    <div
      v-if="Mode === 'dark'"
      :class="$style.picker"
      @click="changeMode('light')"
    >
      <IconLight />
      <span :class="$style.color__descr">
        Day mod
      </span>
    </div>
    <div
      v-if="Mode === 'light'"
      :class="$style.picker"
      @click="changeMode('dark')"
    >
      <IconDark />
      <span :class="$style.color__descr">
        Night mod
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheColorModePicker',

  components: {
    IconDark: () => import('assets/svg/dark.svg?inline'),
    IconLight: () => import('assets/svg/light.svg?inline')
  },

  computed: {
    ...mapState({
      Mode: state => state.modeColor
    }),

    currentIdIcon () {
      return this.Mode === 'light' ? 'dark-icon' : 'light-icon'
    }
  },

  mounted () {
    const pref = this.$colorMode.preference
    if (pref) {
      if (this.isIE() && pref === 'system') {
        this.sendMode('light')
      } else {
        this.sendMode(this.$colorMode.value)
      }
    } else {
      this.sendMode('light')
    }
  },

  methods: {
    changeMode (name) {
      // this.isIE() ? this.changeIEmode(name) : this.sendMode(name)

      if (this.isIE()) {
        this.changeIEmode(name)
        this.changeSVGColor(
          'logo_circle-1',
          'fill',
          this.$options.$RGBcolors.$base0,
          this.$options.$RGBcolors.$base500)
      }
      this.sendMode(name)
      this.$colorMode.value = this.Mode
    },

    sendMode (data) {
      this.$store.dispatch('ACT_COLOR_MODE', data)
    },

    changeIEmode (val) {
      const html = document.getElementsByTagName('html')[0]
      html.removeAttribute('class')
      html.classList.add(`${val}-mode`)
      this.sendMode(val)
    }
  }
}
</script>

<style lang="scss" module>

  .picker {
    display: flex;
    align-items: center;
    width: 110px;
    cursor: pointer;

    span {
      transition: color ease-in-out 300ms;
      margin-left: auto;
    }

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

    @include brp(ml) {
      width: auto;

      span {
        display: none;
      }
    }

    @include brp(xs) {
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>

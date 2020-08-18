<template>
  <div
    v-if="isIE()"
    @mouseenter="hoverSVG(currentIdIcon, 'enter')"
    @mouseleave="hoverSVG(currentIdIcon, 'leave')"
  >
    <div
      v-if="checkMode('dark')"
      :class="$style.picker"
      @click="changeMode('light')"
    >
      <IconLight id="light-icon" />
      <span :class="$style.color__descr">Day mod</span>
    </div>
    <div
      v-if="checkMode('light')"
      :class="$style.picker"
      @click="changeMode('dark')"
    >
      <IconDark id="dark-icon" />
      <span :class="$style.color__descr">Night mod</span>
    </div>
  </div>
  <div v-else>
    <div
      v-if="checkMode('dark')"
      :class="$style.picker"
      @click="changeMode('light')"
    >
      <IconLight />
      <span :class="$style.color__descr">Day mod</span>
    </div>
    <div
      v-if="checkMode('light')"
      :class="$style.picker"
      @click="changeMode('dark')"
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
      IEmode: null
    }
  },
  computed: {
    currentIdIcon () {
      return this.IEmode === 'light' ? 'dark-icon' : 'light-icon'
    }
  },
  watch: {
    IEmode () {
      if (this.isIE()) {
        this.changeSVGLogo()
      }
    }
  },
  mounted () {
    this.changeMode('light')
    this.IEmode = 'light'
  },
  $RGBcolors: {
    $base0: { r: 252, g: 252, b: 252 },
    $base500: { r: 1, g: 35, b: 69 },
    $base200: { r: 153, g: 167, b: 181 },
    $main400: { r: 73, g: 89, b: 255 }
  },
  methods: {
    changeMode (name) {
      this.isIE() ? this.changeIEmode(name) : this.$colorMode.preference = name
    },
    changeIEmode (val) {
      const html = document.getElementsByTagName('html')[0]
      html.removeAttribute('class')
      html.classList.add(`${val}-mode`)
      this.IEmode = val
    },
    checkMode (name) {
      return this.isIE() ? this.IEmode === name : this.$colorMode.value === name
    },
    changeSVGLogo () {
      const html = document.getElementsByTagName('html')[0]
      const element = document.getElementById('logo_circle-1')
      if (html.classList.contains('light-mode')) {
        this.changeSVGcolor(
          element,
          'fill',
          this.$options.$RGBcolors.$base0,
          this.$options.$RGBcolors.$base500,
          300
        )
      }
      if (html.classList.contains('dark-mode')) {
        this.changeSVGcolor(
          element,
          'fill',
          this.$options.$RGBcolors.$base500,
          this.$options.$RGBcolors.$base0,
          300
        )
      }
    }
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

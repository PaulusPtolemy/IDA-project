import Vue from 'vue'
import { mapGetters } from 'vuex'
// для корректной анимации в IE

Vue.mixin({
  computed: {
    ...mapGetters({
      Mode: 'getColorMode'
    })
  },
  $RGBcolors: {
    $base0: { r: 252, g: 252, b: 252 },
    $base200: { r: 153, g: 167, b: 181 },
    $base300: { r: 103, g: 123, b: 143 },
    $base500: { r: 1, g: 35, b: 69 },
    $main400: { r: 73, g: 89, b: 255 }
  },
  methods: {
    SvgAnimation (element, property, startColor, endColor, transitionNumber) {
      const linear = (a, b, u) => (1 - u) * a + u * b

      function fade (element, property, start, end, duration) {
        const interval = 10
        const steps = duration / interval
        const stepU = 1.0 / steps
        let u = 0.0
        const theInterval = setInterval(function () {
          if (u >= 1.0) { clearInterval(theInterval) }
          const r = parseInt(linear(start.r, end.r, u))
          const g = parseInt(linear(start.g, end.g, u))
          const b = parseInt(linear(start.b, end.b, u))
          const colorname = 'rgb(' + r + ',' + g + ',' + b + ')'
          element.setAttribute(property, colorname)
          u += stepU
        }, interval)
      }
      fade(element, property, startColor, endColor, transitionNumber)
    },

    changeSVGColor (id, prop, darkColor, lightColor) {
      const element = document.getElementById(id)

      if (this.Mode === 'light') {
        this.SvgAnimation(
          element,
          prop,
          darkColor,
          lightColor,
          300
        )
      }
      if (this.Mode === 'dark') {
        this.SvgAnimation(
          element,
          prop,
          lightColor,
          darkColor,
          300
        )
      }
    },

    hoverSVG (id, event) {
      const elem = document.getElementById(id)
      const path = elem.getElementsByTagName('path')[0]

      if (event === 'enter') {
        this.SvgAnimation(
          path,
          'fill',
          this.$options.$RGBcolors.$base200,
          this.$options.$RGBcolors.$main400,
          300
        )
      }
      if (event === 'leave') {
        this.SvgAnimation(
          path,
          'fill',
          this.$options.$RGBcolors.$main400,
          this.$options.$RGBcolors.$base200,
          300
        )
      }
    }
  }
})

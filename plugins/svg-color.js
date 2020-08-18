import Vue from 'vue'

const RGBcolors = {
  $base0: { r: 252, g: 252, b: 252 },
  $base500: { r: 1, g: 35, b: 69 },
  $base200: { r: 153, g: 167, b: 181 },
  $main400: { r: 73, g: 89, b: 255 }
}

Vue.mixin({
  methods: {
    changeSVGcolor (element, property, startColor, endColor, transitionNumber) {
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
          element.style.setProperty(property, colorname)
          u += stepU
        }, interval)
      };
      fade(element, property, startColor, endColor, transitionNumber)
    },

    hoverSVG (id, event) {
      const elem = document.getElementById(id)
      const path = elem.getElementsByTagName('path')[0]

      if (event === 'enter') {
        this.changeSVGcolor(
          path,
          'fill',
          RGBcolors.$base200,
          RGBcolors.$main400,
          300
        )
      }
      if (event === 'leave') {
        this.changeSVGcolor(
          path,
          'fill',
          RGBcolors.$main400,
          RGBcolors.$base200,
          300
        )
      }
    }
  }
})

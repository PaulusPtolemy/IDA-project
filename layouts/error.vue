<template>
  <div class="container">
    <div v-if="error.statusCode === 418" :class="$style.error">
      <h1 :class="[$style.color__title, $style.error_title]">
        {{ error.message }}
      </h1>
      <p :class="[$style.color__descr, $style.error_text]">
        Please refresh the page
      </p>
      <btn
        @click="reloadPage"
      >
        <span>
          Reload page
        </span>
      </btn>
    </div>
    <div v-if="error.statusCode === 404" :class="$style.error">
      <h1 :class="[$style.color__title, $style.error_title]">
        Page not found
      </h1>
      <nuxt-link to="/">
        <btn>
          <span>
            Home page
          </span>
        </btn>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtError',
  components: {
    btn: () => import('~/components/controls/TheButton.vue')
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  methods: {
    reloadPage () {
      if (this.isIE()) {
        if (process.browser) {
          window.location.reload(true)
        }
      } else {
        this.$router.go(this.$router.currentRoute)
      }
    }
  }
}
</script>
<style lang="scss" module>
  @import "~/assets/scss/modules_import.scss";
  .error {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &_title {
      font-size: $fontSizeLarge;
      line-height: $line-h-mega;
      margin: 0 0 24px 0;
    }

    &_text {
      margin-bottom: 40px;
    }
  }
</style>

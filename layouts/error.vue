<template>
  <div class="container">
    <div v-if="error.statusCode === 418" :class="[$style.color__bg_secondary ,$style.error]">
      <h1 :class="[$style.color__title, $style.error_title]">
        {{ error.message }}
      </h1>
      <p :class="[$style.color__descr, $style.error_text]">
        Please refresh the page
      </p>
      <VButton
        @click="reloadPage"
      >
        <span>
          Reload page
        </span>
      </VButton>
    </div>
    <div v-if="error.statusCode === 404" :class="[$style.color__bg_secondary ,$style.error]">
      <h1 :class="[$style.color__title, $style.error_title]">
        Page not found
      </h1>
      <nuxt-link to="/">
        <VButton>
          <span>
            Home page
          </span>
        </VButton>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'NuxtError',

    props: {
        error: {
            type: Object,
            default: null,
        },
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
        },
    },
}
</script>
<style lang="scss" module>
  @import "assets/scss/theme";

  .error {
    height: calc(100vh - 144px - 48px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @include content-wrap;

    border-radius: $border-r-large;

    &_title {
      font-size: $fontSizeLarge;
      line-height: $line-h-mega;
      margin: 0 0 24px 0;
    }

    &_text {
      margin-bottom: 40px;
    }
  }

  @include brp(xm) {
    .error {
      border-radius: $border-r-medium;

      &_title {
        margin-bottom: 16px;
        font-size: $fontSizeBigOne;
      }
    }
  }
</style>
